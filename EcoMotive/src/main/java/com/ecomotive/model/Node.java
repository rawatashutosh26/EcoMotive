package com.ecomotive.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity // Tells Spring this is a Database Table
@Table(name = "hubs")
public class Node {
    @Id // Sets the Primary Key
    private String id;
    private String name;
    private double latitude;
    private double longitude;

    // IMPORTANT: JPA requires a no-args constructor
    public Node() {}

    public Node(String id, String name, double lat, double lon) {
        this.id = id;
        this.name = name;
        this.latitude = lat;
        this.longitude = lon;
    }

    // Standard Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }
}