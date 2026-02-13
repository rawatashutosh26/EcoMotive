package com.ecomotive;

import com.ecomotive.engine.DijkstraEngine;
import com.ecomotive.engine.LogisticsGraph;
import com.ecomotive.model.Node;

public class Main {
    public static void main(String[] args) {
        LogisticsGraph network = new LogisticsGraph();
    
    // Setup Cities
        network.addNode(new Node("DEL", "Delhi", 0, 0));
        network.addNode(new Node("MUM", "Mumbai", 0, 0));
        network.addNode(new Node("LON", "London", 0, 0));

    // Routes: Delhi -> Mumbai (Truck)
        network.addEdge("DEL", "MUM", "TRUCK", 500, 24, 200);
    // Routes: Mumbai -> London (Ship)
        network.addEdge("MUM", "LON", "SHIP", 1200, 240, 400);
    // Routes: Delhi -> London (Air - Direct)
        network.addEdge("DEL", "LON", "AIR", 5000, 10, 2000);

        DijkstraEngine engine = new DijkstraEngine(network);

        System.out.println("--- Optimizing for COST ---");
        System.out.println(engine.findBestRoute("DEL", "LON", "COST"));

        System.out.println("--- Optimizing for TIME ---");
        System.out.println(engine.findBestRoute("DEL", "LON", "TIME"));
    }
}