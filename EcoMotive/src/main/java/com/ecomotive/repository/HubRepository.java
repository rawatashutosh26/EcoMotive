package com.ecomotive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecomotive.model.Node;

@Repository
public interface HubRepository extends JpaRepository<Node, String> {
    // Spring generates the SQL for you automatically!
}