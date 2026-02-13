import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import MapView from '../components/MapView';
import './Dashboard.css';

const Dashboard = () => {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fromHub, setFromHub] = useState('BHO');
  const [toHub, setToHub] = useState('MUM');
  const [priority, setPriority] = useState('COST');

  const hubs = [
    { code: 'BHO', name: 'Bhopal' },
    { code: 'MUM', name: 'Mumbai' },
    { code: 'DEL', name: 'Delhi' },
    { code: 'LON', name: 'London' },
    { code: 'HAM', name: 'Hamburg' }
  ];

  const priorities = [
    { value: 'COST', label: '💰 Cheapest', color: '#10b981' },
    { value: 'TIME', label: '⚡ Fastest', color: '#3b82f6' },
    { value: 'CO2', label: '🌿 Greenest', color: '#22c55e' }
  ];

  const getRoute = async () => {
    if (fromHub === toHub) {
      alert('Please select different origin and destination hubs!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/routes/calculate', {
        params: { from: fromHub, to: toHub, type: priority }
      });
      
      setRoute(response.data);
    } catch (error) {
      console.error('Error fetching route:', error);
      alert('Make sure your Spring Boot backend is running!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="dashboard-title">Route Optimizer</h1>
          <p className="dashboard-subtitle">Find the optimal path for your logistics</p>
        </motion.div>

        <motion.div
          className="route-selector"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="selector-group">
            <label>From Hub</label>
            <select
              value={fromHub}
              onChange={(e) => setFromHub(e.target.value)}
              className="hub-select"
            >
              {hubs.map(hub => (
                <option key={hub.code} value={hub.code}>
                  {hub.name} ({hub.code})
                </option>
              ))}
            </select>
          </div>

          <motion.div
            className="swap-icon"
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const temp = fromHub;
              setFromHub(toHub);
              setToHub(temp);
            }}
          >
            ⇅
          </motion.div>

          <div className="selector-group">
            <label>To Hub</label>
            <select
              value={toHub}
              onChange={(e) => setToHub(e.target.value)}
              className="hub-select"
            >
              {hubs.map(hub => (
                <option key={hub.code} value={hub.code}>
                  {hub.name} ({hub.code})
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div
          className="priority-selector"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label>Optimization Priority</label>
          <div className="priority-buttons">
            {priorities.map((p) => (
              <motion.button
                key={p.value}
                className={`priority-btn ${priority === p.value ? 'active' : ''}`}
                onClick={() => setPriority(p.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderColor: priority === p.value ? p.color : '#e5e7eb',
                  backgroundColor: priority === p.value ? `${p.color}15` : 'transparent'
                }}
              >
                {p.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.button
          className="calculate-btn"
          onClick={getRoute}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Calculating...
            </>
          ) : (
            '🚀 Calculate Optimal Route'
          )}
        </motion.button>

        {route && (
          <motion.div
            className="route-results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Route Details</h3>
            <div className="result-grid">
              <motion.div
                className="result-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="result-icon">💰</div>
                <div className="result-value">${route.totalCost?.toFixed(2) || '0.00'}</div>
                <div className="result-label">Total Cost</div>
              </motion.div>
              <motion.div
                className="result-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="result-icon">⏱️</div>
                <div className="result-value">{route.totalTime?.toFixed(1) || '0.0'} hrs</div>
                <div className="result-label">Total Time</div>
              </motion.div>
              <motion.div
                className="result-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="result-icon">🌿</div>
                <div className="result-value">{route.totalCo2?.toFixed(1) || '0.0'} kg</div>
                <div className="result-label">CO₂ Emissions</div>
              </motion.div>
            </div>
            {route.path && route.path.length > 0 && (
              <div className="route-steps">
                <h4>Route Path:</h4>
                <div className="steps-list">
                  {route.path.map((edge, idx) => (
                    <motion.div
                      key={idx}
                      className="step-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <span className="step-mode">{edge.mode || 'N/A'}</span>
                      <span className="step-path">
                        {edge.sourceNodeId} → {edge.targetNodeId}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <motion.div
        className="dashboard-map"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <MapView routeData={route} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
