package com.ecomotive.engine;

import com.ecomotive.model.*;
import java.util.*;

public class DijkstraEngine {
    private final LogisticsGraph graph;

    public DijkstraEngine(LogisticsGraph graph) {
        this.graph = graph;
    }

    public RouteResult findBestRoute(String startNode, String endNode, String optimizationType) {
        // PriorityQueue helps us always pick the "cheapest" next step
        PriorityQueue<NodeWrapper> pq = new PriorityQueue<>(Comparator.comparingDouble(w -> w.currentWeight));
        
        Map<String, Double> bestWeights = new HashMap<>();
        Map<String, Edge> cameFromEdge = new HashMap<>();
        Map<String, String> cameFromNode = new HashMap<>();

        pq.add(new NodeWrapper(startNode, 0));
        bestWeights.put(startNode, 0.0);

        while (!pq.isEmpty()) {
            NodeWrapper current = pq.poll();

            if (current.nodeId.equals(endNode)) break;

            for (Edge edge : graph.getEdgesFrom(current.nodeId)) {
                // Determine weight based on user preference
                double weight = switch (optimizationType.toUpperCase()) {
                    case "COST" -> edge.getCost();
                    case "TIME" -> edge.getTime();
                    case "CO2" -> edge.getCo2();
                    default -> edge.getCost();
                };

                double newWeight = bestWeights.get(current.nodeId) + weight;

                if (newWeight < bestWeights.getOrDefault(edge.getTargetNodeId(), Double.MAX_VALUE)) {
                    bestWeights.put(edge.getTargetNodeId(), newWeight);
                    cameFromEdge.put(edge.getTargetNodeId(), edge);
                    cameFromNode.put(edge.getTargetNodeId(), current.nodeId);
                    pq.add(new NodeWrapper(edge.getTargetNodeId(), newWeight));
                }
            }
        }

        return reconstructPath(cameFromEdge, cameFromNode, endNode);
    }

    private RouteResult reconstructPath(Map<String, Edge> edges, Map<String, String> nodes, String end) {
        List<Edge> path = new ArrayList<>();
        double tCost = 0, tTime = 0, tCo2 = 0;
        String curr = end;

        while (edges.containsKey(curr)) {
            Edge e = edges.get(curr);
            path.add(0, e);
            tCost += e.getCost();
            tTime += e.getTime();
            tCo2 += e.getCo2();
            curr = nodes.get(curr);
        }
        return new RouteResult(path, tCost, tTime, tCo2);
    }

    // Helper class for the PriorityQueue
    private static class NodeWrapper {
        String nodeId;
        double currentWeight;
        NodeWrapper(String id, double w) { this.nodeId = id; this.currentWeight = w; }
    }
}