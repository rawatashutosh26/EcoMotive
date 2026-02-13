package com.ecomotive.engine;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ecomotive.model.Edge;
import com.ecomotive.model.Node;

public class LogisticsGraph {
    // Stores the actual Node objects (City details)
    private final Map<String, Node> nodes = new HashMap<>();
    
    // The Adjacency List: Map<SourceID, List of Paths leaving that Source>
    private final Map<String, List<Edge>> adjacencyList = new HashMap<>();

    // Add a City to our network
    public void addNode(Node node) {
        nodes.put(node.getId(), node);
        adjacencyList.putIfAbsent(node.getId(), new ArrayList<>());
    }

    // Add a Connection (Edge) between two cities
    public void addEdge(String sourceId, String targetId, String mode, double cost, double time, double co2) {
        if (!nodes.containsKey(sourceId) || !nodes.containsKey(targetId)) {
            return;
        }   
        Edge edge = new Edge(sourceId, targetId, mode, cost, time, co2);
        adjacencyList.get(sourceId).add(edge);
    }

    // Helper to get all paths from a specific city
    public List<Edge> getEdgesFrom(String nodeId) {
        return adjacencyList.getOrDefault(nodeId, Collections.emptyList());
    }

    // Helper to get City details by ID
    public Node getNode(String nodeId) {
        return nodes.get(nodeId);
    }
}