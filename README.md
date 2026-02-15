# 🚛 EcoMotive: Multi-Modal Logistics Optimization Platform

<img width="1848" height="1038" alt="Screenshot 2026-02-13 231536" src="https://github.com/user-attachments/assets/95b79cb1-0cd3-42f6-9dbf-9da8a9f1880f" />


**EcoMotive** is a full-stack logistics intelligence platform designed to optimize supply chain networks. It helps logistics managers find the best transport routes by balancing **Cost**, **Time**, and **Carbon Emissions (CO₂)**.

Built with **Spring Boot** (Backend), **React** (Frontend), and **PostGIS** (Geospatial Database), EcoMotive implements **Dijkstra’s Algorithm** on a real-world graph network to provide instant, optimal routing solutions.

---

## 🚀 Key Features

<img width="1852" height="944" alt="Screenshot 2026-02-13 231558" src="https://github.com/user-attachments/assets/ba49a69a-6d0c-42f7-ab31-5889fee41bc7" />


* **🌍 Multi-Modal Routing:** Seamlessly switch between Truck, Rail, and Ship transport modes.
* **⚡ Real-Time Optimization:** instantly calculate the Cheapest, Fastest, or Greenest route.
* **🌿 Carbon Footprint Tracking:** Monitor CO₂ emissions and visualize environmental impact.
* **📊 Advanced Analytics:** Interactive charts for network performance and cost distribution.
* **📍 Hub Management:** Dynamic graph editing—add or remove cities and routes instantly.

---

## 📸 Application Walkthrough

### 1. Interactive Dashboard
The core interface allows users to select source/destination hubs and optimization criteria. The optimal path is visualized on an interactive map using Leaflet.js.
<img width="1848" height="872" alt="Screenshot 2026-02-13 231342" src="https://github.com/user-attachments/assets/071eeb4f-9f86-4c2c-8c1f-e210360e84b4" />


### 2. Network Analytics
Comprehensive insights into the logistics network, showing total hubs, routes, and average metrics across the entire supply chain.
<img width="1828" height="867" alt="Screenshot 2026-02-13 231401" src="https://github.com/user-attachments/assets/af7a6126-3505-460f-b8db-acdc1e15fd19" />

### 3. Route History
A persistent log of all calculated routes, allowing users to compare past shipments and filter by optimization priority.
<img width="1849" height="871" alt="Screenshot 2026-02-13 231428" src="https://github.com/user-attachments/assets/a7cf32a0-335b-4677-add5-c6f25675caf6" />


### 4. Carbon Impact Analysis
Dedicated environmental monitoring dashboard tracking total CO₂ saved compared to standard routing, including tree-equivalent metrics.
<img width="1849" height="1039" alt="Screenshot 2026-02-13 231503" src="https://github.com/user-attachments/assets/868d786b-7571-4457-926c-9003f8a2f7d4" />


### 5. Hub & Route Management
Admin interface to dynamically modify the graph network. Users can add new cities (nodes) and transport links (edges) without touching the code.
<img width="1849" height="1079" alt="Screenshot 2026-02-13 231520" src="https://github.com/user-attachments/assets/463628f1-c427-4cde-b2db-48ac356fbc51" />


---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Interactive UI with Framer Motion animations |
| **Backend** | Java Spring Boot | REST API & Business Logic |
| **Database** | PostgreSQL + PostGIS | Spatial Data Storage & Graph Persistence |
| **Mapping** | Leaflet.js | Interactive Maps & Tile Rendering |
| **Algorithm** | Dijkstra's Algorithm | Weighted Graph Traversal for Optimization |
| **Charts** | Recharts | Data Visualization & Analytics |

---

## ⚙️ Installation & Setup

### Prerequisites
* Java JDK 17+
* Node.js & npm
* PostgreSQL with PostGIS extension enabled

### 1. Database Setup
```sql
CREATE DATABASE ecomotive_db;
CREATE EXTENSION postgis;
-- The Spring Boot application will auto-generate tables on first run
```
## 2. Backend Setup
```bash
git clone https://github.com/rawatashutosh26/EcoMotive.git
cd ecomotive  
./mvnw spring-boot:run  
```
The server will start at: 
```bash
http://localhost:8080
```

## 3. Frontend Setup
```bash
cd ecomotive-frontend  
npm install  
npm run dev  
```
The client will start at:  
http://localhost:5173

## 📡 API Endpoints

| Method | Endpoint                     | Description                                   |
|-------:|------------------------------|-----------------------------------------------|
| GET    | /api/routes/calculate        | Calculate optimal path (from, to, type)       |
| GET    | /api/network/stats           | Retrieve global network statistics            |
| GET    | /api/network/hubs            | List all active hubs                          |
| POST   | /api/network/hubs            | Add a new hub to the graph                    |
