import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './NetworkAnalytics.css';

const NetworkAnalytics = () => {
  const [stats, setStats] = useState({
    totalHubs: 0,
    totalRoutes: 0,
    avgCost: 0,
    avgTime: 0,
    avgCo2: 0,
    modeDistribution: [],
    costByMode: [],
    co2ByMode: [],
    timeByMode: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsResponse, routesResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/network/stats'),
          axios.get('http://localhost:8080/api/network/routes')
        ]);

        const networkStats = statsResponse.data;
        const routes = routesResponse.data;

        // Calculate mode distribution
        const modeCount = {};
        routes.forEach(route => {
          modeCount[route.mode] = (modeCount[route.mode] || 0) + 1;
        });

        const modeDistribution = Object.entries(modeCount).map(([name, value], idx) => ({
          name,
          value,
          color: ['#3b82f6', '#10b981', '#8b5cf6'][idx % 3]
        }));

        // Calculate averages by mode
        const modeData = {};
        routes.forEach(route => {
          if (!modeData[route.mode]) {
            modeData[route.mode] = { cost: [], co2: [], time: [] };
          }
          modeData[route.mode].cost.push(route.cost);
          modeData[route.mode].co2.push(route.co2);
          modeData[route.mode].time.push(route.time);
        });

        const costByMode = Object.entries(modeData).map(([mode, data]) => ({
          mode,
          cost: data.cost.reduce((a, b) => a + b, 0) / data.cost.length || 0
        }));

        const co2ByMode = Object.entries(modeData).map(([mode, data]) => ({
          mode,
          co2: data.co2.reduce((a, b) => a + b, 0) / data.co2.length || 0
        }));

        const timeByMode = Object.entries(modeData).map(([mode, data]) => ({
          mode,
          time: data.time.reduce((a, b) => a + b, 0) / data.time.length || 0
        }));

        setStats({
          totalHubs: networkStats.totalHubs,
          totalRoutes: networkStats.totalRoutes,
          avgCost: networkStats.avgCost,
          avgTime: networkStats.avgTime,
          avgCo2: networkStats.avgCo2,
          modeDistribution,
          costByMode,
          co2ByMode,
          timeByMode
        });
      } catch (error) {
        console.error('Error fetching network stats:', error);
        // Fallback to default data
        setStats({
          totalHubs: 5,
          totalRoutes: 12,
          avgCost: 450,
          avgTime: 18.5,
          avgCo2: 125.3,
          modeDistribution: [
            { name: 'Truck', value: 5, color: '#3b82f6' },
            { name: 'Rail', value: 4, color: '#10b981' },
            { name: 'Ship', value: 3, color: '#8b5cf6' }
          ],
          costByMode: [
            { mode: 'Truck', cost: 320 },
            { mode: 'Rail', cost: 180 },
            { mode: 'Ship', cost: 250 }
          ],
          co2ByMode: [
            { mode: 'Truck', co2: 150 },
            { mode: 'Rail', co2: 80 },
            { mode: 'Ship', co2: 120 }
          ],
          timeByMode: [
            { mode: 'Truck', time: 12 },
            { mode: 'Rail', time: 24 },
            { mode: 'Ship', time: 48 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="analytics-loading">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          📊
        </motion.div>
        <p>Loading network analytics...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="analytics-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="analytics-header" variants={itemVariants}>
        <h1>Network Analytics</h1>
        <p>Comprehensive insights into your logistics network</p>
      </motion.div>

      <div className="stats-grid">
        <motion.div className="stat-card" variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <div className="stat-icon">🏢</div>
          <div className="stat-value">{stats.totalHubs}</div>
          <div className="stat-label">Total Hubs</div>
        </motion.div>
        <motion.div className="stat-card" variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <div className="stat-icon">🛣️</div>
          <div className="stat-value">{stats.totalRoutes}</div>
          <div className="stat-label">Total Routes</div>
        </motion.div>
        <motion.div className="stat-card" variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <div className="stat-icon">💰</div>
          <div className="stat-value">${stats.avgCost.toFixed(2)}</div>
          <div className="stat-label">Avg Cost</div>
        </motion.div>
        <motion.div className="stat-card" variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{stats.avgTime.toFixed(1)}h</div>
          <div className="stat-label">Avg Time</div>
        </motion.div>
        <motion.div className="stat-card" variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <div className="stat-icon">🌿</div>
          <div className="stat-value">{stats.avgCo2.toFixed(1)}kg</div>
          <div className="stat-label">Avg CO₂</div>
        </motion.div>
      </div>

      {stats.modeDistribution && stats.modeDistribution.length > 0 && (
        <div className="charts-grid">
          <motion.div className="chart-card" variants={itemVariants}>
            <h3>Transport Mode Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.modeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {stats.modeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {stats.costByMode && stats.costByMode.length > 0 && (
            <motion.div className="chart-card" variants={itemVariants}>
              <h3>Cost by Transport Mode</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.costByMode}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mode" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#3b82f6" radius={[8, 8, 0, 0]} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {stats.co2ByMode && stats.co2ByMode.length > 0 && (
            <motion.div className="chart-card" variants={itemVariants}>
              <h3>CO₂ Emissions by Mode</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.co2ByMode}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mode" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="co2" fill="#22c55e" radius={[8, 8, 0, 0]} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {stats.timeByMode && stats.timeByMode.length > 0 && (
            <motion.div className="chart-card" variants={itemVariants}>
              <h3>Time Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.timeByMode}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mode" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="time" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6 }} animationDuration={1000} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default NetworkAnalytics;
