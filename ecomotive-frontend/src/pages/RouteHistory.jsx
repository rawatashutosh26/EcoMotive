import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RouteHistory.css';

const RouteHistory = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate saved route history
    const savedRoutes = [
      {
        id: 1,
        from: 'BHO',
        to: 'MUM',
        priority: 'COST',
        cost: 450,
        time: 18,
        co2: 120,
        date: '2026-02-10',
        path: ['BHO', 'DEL', 'MUM']
      },
      {
        id: 2,
        from: 'DEL',
        to: 'LON',
        priority: 'TIME',
        cost: 1200,
        time: 12,
        co2: 350,
        date: '2026-02-11',
        path: ['DEL', 'LON']
      },
      {
        id: 3,
        from: 'MUM',
        to: 'HAM',
        priority: 'CO2',
        cost: 800,
        time: 24,
        co2: 180,
        date: '2026-02-12',
        path: ['MUM', 'LON', 'HAM']
      }
    ];
    setHistory(savedRoutes);
  }, []);

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(route => route.priority === filter);

  const deleteRoute = (id) => {
    setHistory(history.filter(route => route.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'COST': return '#10b981';
      case 'TIME': return '#3b82f6';
      case 'CO2': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'COST': return '💰 Cheapest';
      case 'TIME': return '⚡ Fastest';
      case 'CO2': return '🌿 Greenest';
      default: return priority;
    }
  };

  return (
    <motion.div
      className="history-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="history-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1>Route History</h1>
        <p>View and manage your saved routes</p>
      </motion.div>

      <motion.div
        className="filter-buttons"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {['all', 'COST', 'TIME', 'CO2'].map((f) => (
          <motion.button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {f === 'all' ? '📋 All Routes' : getPriorityLabel(f)}
          </motion.button>
        ))}
      </motion.div>

      <div className="history-list">
        <AnimatePresence>
          {filteredHistory.length === 0 ? (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="empty-icon">📭</div>
              <p>No routes found</p>
            </motion.div>
          ) : (
            filteredHistory.map((route, index) => (
              <motion.div
                key={route.id}
                className="history-card"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}
              >
                <div className="card-header">
                  <div className="route-info">
                    <h3>
                      {route.from} → {route.to}
                    </h3>
                    <span
                      className="priority-badge"
                      style={{ backgroundColor: `${getPriorityColor(route.priority)}20`, color: getPriorityColor(route.priority) }}
                    >
                      {getPriorityLabel(route.priority)}
                    </span>
                  </div>
                  <motion.button
                    className="delete-btn"
                    onClick={() => deleteRoute(route.id)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    🗑️
                  </motion.button>
                </div>

                <div className="route-stats">
                  <div className="stat-item">
                    <span className="stat-icon">💰</span>
                    <div>
                      <div className="stat-value">${route.cost}</div>
                      <div className="stat-label">Cost</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">⏱️</span>
                    <div>
                      <div className="stat-value">{route.time}h</div>
                      <div className="stat-label">Time</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🌿</span>
                    <div>
                      <div className="stat-value">{route.co2}kg</div>
                      <div className="stat-label">CO₂</div>
                    </div>
                  </div>
                </div>

                <div className="route-path">
                  <span className="path-label">Path:</span>
                  <div className="path-steps">
                    {route.path.map((hub, idx) => (
                      <motion.span
                        key={idx}
                        className="path-hub"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                      >
                        {hub}
                        {idx < route.path.length - 1 && <span className="path-arrow">→</span>}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="route-date">
                  <span>📅 {new Date(route.date).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RouteHistory;
