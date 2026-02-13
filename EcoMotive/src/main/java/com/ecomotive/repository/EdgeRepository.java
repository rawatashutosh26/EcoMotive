package com.ecomotive.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecomotive.model.Edge;

public interface EdgeRepository extends JpaRepository<Edge, Long> {
    // Custom query to find all routes starting from a specific city
    List<Edge> findBySourceNodeId(String sourceNodeId);
}