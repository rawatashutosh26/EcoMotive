package com.ecomotive.model;

import java.util.List;

public class RouteResult {
    private final List<Edge> path;
    private final double totalCost;
    private final double totalTime;
    private final double totalCo2;

    public RouteResult(List<Edge> path, double totalCost, double totalTime, double totalCo2) {
        this.path = path;
        this.totalCost = totalCost;
        this.totalTime = totalTime;
        this.totalCo2 = totalCo2;
    }

    // Getters for JSON serialization
    public List<Edge> getPath() { return path; }
    public double getTotalCost() { return totalCost; }
    public double getTotalTime() { return totalTime; }
    public double getTotalCo2() { return totalCo2; }

    @Override
    public String toString() {
        return String.format("Route: %d steps | Cost: $%.2f | Time: %.1fh | CO2: %.1fkg", 
                              path.size(), totalCost, totalTime, totalCo2);
    }
}