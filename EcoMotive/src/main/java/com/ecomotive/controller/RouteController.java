package com.ecomotive.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecomotive.model.RouteResult;
import com.ecomotive.service.RoutingService;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "http://localhost:5173") // <--- THIS LINE IS CRITICAL
public class RouteController {

    private final RoutingService routingService;

    public RouteController(RoutingService routingService) {
        this.routingService = routingService;
    }

    @GetMapping("/calculate")
    public RouteResult calculate(@RequestParam String from, 
                                 @RequestParam String to, 
                                 @RequestParam String type) {
        return routingService.getBestRoute(from, to, type);
    }
}