package com.ecomotive.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecomotive.engine.DijkstraEngine;
import com.ecomotive.engine.LogisticsGraph;
import com.ecomotive.model.Edge;
import com.ecomotive.model.Node;
import com.ecomotive.model.RouteResult;
import com.ecomotive.repository.EdgeRepository;
import com.ecomotive.repository.HubRepository;

import jakarta.annotation.PostConstruct;

@Service
public class RoutingService {
    private final HubRepository hubRepository;
    private final EdgeRepository edgeRepository;
    private LogisticsGraph graph;
    private DijkstraEngine engine;

    public RoutingService(HubRepository hubRepository, EdgeRepository edgeRepository) {
        this.hubRepository = hubRepository;
        this.edgeRepository = edgeRepository;
    }

    @PostConstruct
    public void init() {
        // Load data from DB into the Algorithm Graph
        graph = new LogisticsGraph();
        List<Node> allNodes = hubRepository.findAll();
        List<Edge> allEdges = edgeRepository.findAll();

        for (Node n : allNodes) graph.addNode(n);
        for (Edge e : allEdges) {
            // This now matches the 6-parameter constructor
            graph.addEdge(e.getSourceNodeId(), e.getTargetNodeId(), e.getMode(), 
                          e.getCost(), e.getTime(), e.getCo2());
        }

        engine = new DijkstraEngine(graph);
        System.out.println("Backend ready with " + allNodes.size() + " hubs.");
    }

    public RouteResult getBestRoute(String from, String to, String type) {
        return engine.findBestRoute(from, to, type);
    }
}