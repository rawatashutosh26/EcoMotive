import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HubManagement.css';

const HubManagement = () => {
  const [hubs, setHubs] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [showAddHub, setShowAddHub] = useState(false);
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [newHub, setNewHub] = useState({ id: '', name: '', lat: '', lon: '' });
  const [newRoute, setNewRoute] = useState({ from: '', to: '', mode: 'TRUCK', cost: '', time: '', co2: '' });

  useEffect(() => {
    // Simulate loading hubs and routes
    setHubs([
      { id: 'BHO', name: 'Bhopal', lat: 23.25, lon: 77.41 },
      { id: 'MUM', name: 'Mumbai', lat: 19.07, lon: 72.87 },
      { id: 'DEL', name: 'Delhi', lat: 28.61, lon: 77.20 },
      { id: 'LON', name: 'London', lat: 51.50, lon: -0.12 },
      { id: 'HAM', name: 'Hamburg', lat: 53.54, lon: 9.99 }
    ]);

    setRoutes([
      { id: 1, from: 'BHO', to: 'DEL', mode: 'TRUCK', cost: 200, time: 12, co2: 80 },
      { id: 2, from: 'DEL', to: 'MUM', mode: 'RAIL', cost: 150, time: 18, co2: 40 },
      { id: 3, from: 'MUM', to: 'LON', mode: 'SHIP', cost: 800, time: 20, co2: 120 }
    ]);
  }, []);

  const addHub = () => {
    if (newHub.id && newHub.name && newHub.lat && newHub.lon) {
      setHubs([...hubs, { ...newHub, lat: parseFloat(newHub.lat), lon: parseFloat(newHub.lon) }]);
      setNewHub({ id: '', name: '', lat: '', lon: '' });
      setShowAddHub(false);
    }
  };

  const addRoute = () => {
    if (newRoute.from && newRoute.to && newRoute.cost && newRoute.time && newRoute.co2) {
      setRoutes([...routes, {
        ...newRoute,
        id: routes.length + 1,
        cost: parseFloat(newRoute.cost),
        time: parseFloat(newRoute.time),
        co2: parseFloat(newRoute.co2)
      }]);
      setNewRoute({ from: '', to: '', mode: 'TRUCK', cost: '', time: '', co2: '' });
      setShowAddRoute(false);
    }
  };

  const deleteHub = (id) => {
    setHubs(hubs.filter(hub => hub.id !== id));
    setRoutes(routes.filter(route => route.from !== id && route.to !== id));
  };

  const deleteRoute = (id) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  return (
    <motion.div
      className="hub-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="hub-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1>Hub Management</h1>
        <p>Manage your logistics network hubs and routes</p>
      </motion.div>

      <div className="management-grid">
        <motion.div
          className="management-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-header">
            <h2>🏢 Hubs ({hubs.length})</h2>
            <motion.button
              className="add-btn"
              onClick={() => setShowAddHub(!showAddHub)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + Add Hub
            </motion.button>
          </div>

          <AnimatePresence>
            {showAddHub && (
              <motion.div
                className="add-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <input
                  type="text"
                  placeholder="Hub ID (e.g., NYC)"
                  value={newHub.id}
                  onChange={(e) => setNewHub({ ...newHub, id: e.target.value.toUpperCase() })}
                />
                <input
                  type="text"
                  placeholder="Hub Name"
                  value={newHub.name}
                  onChange={(e) => setNewHub({ ...newHub, name: e.target.value })}
                />
                <div className="coord-inputs">
                  <input
                    type="number"
                    placeholder="Latitude"
                    value={newHub.lat}
                    onChange={(e) => setNewHub({ ...newHub, lat: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Longitude"
                    value={newHub.lon}
                    onChange={(e) => setNewHub({ ...newHub, lon: e.target.value })}
                  />
                </div>
                <div className="form-actions">
                  <button onClick={addHub} className="save-btn">Save</button>
                  <button onClick={() => setShowAddHub(false)} className="cancel-btn">Cancel</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="items-list">
            <AnimatePresence>
              {hubs.map((hub, index) => (
                <motion.div
                  key={hub.id}
                  className="item-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="item-info">
                    <h3>{hub.name}</h3>
                    <p className="item-code">{hub.id}</p>
                    <p className="item-coords">
                      📍 {hub.lat.toFixed(2)}, {hub.lon.toFixed(2)}
                    </p>
                  </div>
                  <motion.button
                    className="delete-btn"
                    onClick={() => deleteHub(hub.id)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    🗑️
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="management-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="section-header">
            <h2>🛣️ Routes ({routes.length})</h2>
            <motion.button
              className="add-btn"
              onClick={() => setShowAddRoute(!showAddRoute)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + Add Route
            </motion.button>
          </div>

          <AnimatePresence>
            {showAddRoute && (
              <motion.div
                className="add-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="route-selects">
                  <select
                    value={newRoute.from}
                    onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
                  >
                    <option value="">From Hub</option>
                    {hubs.map(hub => (
                      <option key={hub.id} value={hub.id}>{hub.name}</option>
                    ))}
                  </select>
                  <select
                    value={newRoute.to}
                    onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
                  >
                    <option value="">To Hub</option>
                    {hubs.map(hub => (
                      <option key={hub.id} value={hub.id}>{hub.name}</option>
                    ))}
                  </select>
                </div>
                <select
                  value={newRoute.mode}
                  onChange={(e) => setNewRoute({ ...newRoute, mode: e.target.value })}
                >
                  <option value="TRUCK">Truck</option>
                  <option value="RAIL">Rail</option>
                  <option value="SHIP">Ship</option>
                </select>
                <div className="route-inputs">
                  <input
                    type="number"
                    placeholder="Cost ($)"
                    value={newRoute.cost}
                    onChange={(e) => setNewRoute({ ...newRoute, cost: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Time (hours)"
                    value={newRoute.time}
                    onChange={(e) => setNewRoute({ ...newRoute, time: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="CO₂ (kg)"
                    value={newRoute.co2}
                    onChange={(e) => setNewRoute({ ...newRoute, co2: e.target.value })}
                  />
                </div>
                <div className="form-actions">
                  <button onClick={addRoute} className="save-btn">Save</button>
                  <button onClick={() => setShowAddRoute(false)} className="cancel-btn">Cancel</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="items-list">
            <AnimatePresence>
              {routes.map((route, index) => (
                <motion.div
                  key={route.id}
                  className="item-card route-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="item-info">
                    <div className="route-header">
                      <h3>{route.from} → {route.to}</h3>
                      <span className={`mode-badge ${route.mode.toLowerCase()}`}>
                        {route.mode}
                      </span>
                    </div>
                    <div className="route-details">
                      <span>💰 ${route.cost}</span>
                      <span>⏱️ {route.time}h</span>
                      <span>🌿 {route.co2}kg</span>
                    </div>
                  </div>
                  <motion.button
                    className="delete-btn"
                    onClick={() => deleteRoute(route.id)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    🗑️
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HubManagement;
