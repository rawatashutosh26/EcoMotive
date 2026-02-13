package com.ecomotive.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecomotive.service.NetworkService;

@RestController
@RequestMapping("/api/network")
@CrossOrigin(origins = "http://localhost:5173")
public class NetworkController {

    private final NetworkService networkService;

    public NetworkController(NetworkService networkService) {
        this.networkService = networkService;
    }

    @GetMapping("/stats")
    public NetworkStats getStats() {
        return networkService.getNetworkStatistics();
    }

    @GetMapping("/hubs")
    public java.util.List<com.ecomotive.model.Node> getAllHubs() {
        return networkService.getAllHubs();
    }

    @GetMapping("/routes")
    public java.util.List<com.ecomotive.model.Edge> getAllRoutes() {
        return networkService.getAllRoutes();
    }

    public static class NetworkStats {
        private long totalHubs;
        private long totalRoutes;
        private double avgCost;
        private double avgTime;
        private double avgCo2;

        public NetworkStats(long totalHubs, long totalRoutes, double avgCost, double avgTime, double avgCo2) {
            this.totalHubs = totalHubs;
            this.totalRoutes = totalRoutes;
            this.avgCost = avgCost;
            this.avgTime = avgTime;
            this.avgCo2 = avgCo2;
        }

        // Getters
        public long getTotalHubs() { return totalHubs; }
        public long getTotalRoutes() { return totalRoutes; }
        public double getAvgCost() { return avgCost; }
        public double getAvgTime() { return avgTime; }
        public double getAvgCo2() { return avgCo2; }
    }
}
