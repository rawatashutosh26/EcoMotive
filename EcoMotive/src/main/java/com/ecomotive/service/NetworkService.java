package com.ecomotive.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ecomotive.model.Edge;
import com.ecomotive.model.Node;
import com.ecomotive.repository.EdgeRepository;
import com.ecomotive.repository.HubRepository;

@Service
public class NetworkService {
    private final HubRepository hubRepository;
    private final EdgeRepository edgeRepository;

    public NetworkService(HubRepository hubRepository, EdgeRepository edgeRepository) {
        this.hubRepository = hubRepository;
        this.edgeRepository = edgeRepository;
    }

    public com.ecomotive.controller.NetworkController.NetworkStats getNetworkStatistics() {
        long totalHubs = hubRepository.count();
        long totalRoutes = edgeRepository.count();
        
        List<Edge> allRoutes = edgeRepository.findAll();
        
        double avgCost = allRoutes.stream()
            .mapToDouble(Edge::getCost)
            .average()
            .orElse(0.0);
        
        double avgTime = allRoutes.stream()
            .mapToDouble(Edge::getTime)
            .average()
            .orElse(0.0);
        
        double avgCo2 = allRoutes.stream()
            .mapToDouble(Edge::getCo2)
            .average()
            .orElse(0.0);

        return new com.ecomotive.controller.NetworkController.NetworkStats(
            totalHubs, totalRoutes, avgCost, avgTime, avgCo2
        );
    }

    public List<Node> getAllHubs() {
        return hubRepository.findAll();
    }

    public List<Edge> getAllRoutes() {
        return edgeRepository.findAll();
    }
}
