package com.ecomotive.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "routes")
public class Edge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sourceNodeId; // Where the journey starts
    private String targetNodeId; // Where it ends
    private String mode;         // TRUCK, RAIL, SHIP
    private double cost;
    private double time;
    private double co2;

    public Edge() {}

    public Edge(String sourceNodeId, String targetNodeId, String mode, double cost, double time, double co2) {
        this.sourceNodeId = sourceNodeId;
        this.targetNodeId = targetNodeId;
        this.mode = mode;
        this.cost = cost;
        this.time = time;
        this.co2 = co2;
    }

    // Getters
    public String getTargetNodeId() { return targetNodeId; }
    public String getSourceNodeId() { return sourceNodeId; }
    public String getMode() { return mode; }
    public double getCost() { return cost; }
    public double getTime() { return time; }
    public double getCo2() { return co2; }
    public Long getId() { return id; }
}