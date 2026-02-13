import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './CarbonImpact.css';

const CarbonImpact = () => {
  const [impactData, setImpactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setImpactData({
        totalSaved: 1250,
        monthlyTrend: [
          { month: 'Jan', saved: 200, emitted: 800 },
          { month: 'Feb', saved: 250, emitted: 750 },
          { month: 'Mar', saved: 300, emitted: 700 },
          { month: 'Apr', saved: 400, emitted: 600 }
        ],
        byMode: [
          { mode: 'Truck', co2: 450, saved: 150 },
          { mode: 'Rail', co2: 200, saved: 300 },
          { mode: 'Ship', co2: 350, saved: 200 }
        ],
        comparison: [
          { route: 'BHO-MUM', optimized: 120, standard: 200, savings: 80 },
          { route: 'DEL-LON', optimized: 350, standard: 500, savings: 150 },
          { route: 'MUM-HAM', optimized: 180, standard: 280, savings: 100 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="carbon-loading">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          🌱
        </motion.div>
        <p>Loading carbon impact data...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="carbon-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="carbon-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1>Carbon Impact Analysis</h1>
        <p>Track your environmental footprint and savings</p>
      </motion.div>

      <motion.div
        className="impact-summary"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="summary-card primary">
          <motion.div
            className="summary-icon"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🌿
          </motion.div>
          <div className="summary-content">
            <div className="summary-value">{impactData.totalSaved} kg</div>
            <div className="summary-label">Total CO₂ Saved</div>
            <div className="summary-subtext">Through optimized routing</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">🌍</div>
          <div className="summary-content">
            <div className="summary-value">42%</div>
            <div className="summary-label">Reduction Rate</div>
            <div className="summary-subtext">vs. standard routes</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">🌳</div>
          <div className="summary-content">
            <div className="summary-value">~{Math.round(impactData.totalSaved / 21)}</div>
            <div className="summary-label">Trees Equivalent</div>
            <div className="summary-subtext">Annual CO₂ absorption</div>
          </div>
        </div>
      </motion.div>

      <div className="charts-section">
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Monthly CO₂ Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={impactData.monthlyTrend}>
              <defs>
                <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEmitted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="saved" stroke="#22c55e" fillOpacity={1} fill="url(#colorSaved)" />
              <Area type="monotone" dataKey="emitted" stroke="#ef4444" fillOpacity={1} fill="url(#colorEmitted)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>CO₂ by Transport Mode</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData.byMode}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mode" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="co2" fill="#ef4444" name="Emitted" radius={[8, 8, 0, 0]} />
              <Bar dataKey="saved" fill="#22c55e" name="Saved" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card full-width"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Route Optimization Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData.comparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="route" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="standard" fill="#ef4444" name="Standard Route" radius={[8, 8, 0, 0]} />
              <Bar dataKey="optimized" fill="#22c55e" name="Optimized Route" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        className="tips-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3>💡 Tips to Reduce Carbon Footprint</h3>
        <div className="tips-grid">
          {[
            { icon: '🚂', text: 'Prefer rail transport for long distances' },
            { icon: '🚢', text: 'Use sea routes when time allows' },
            { icon: '📊', text: 'Regularly review and optimize routes' },
            { icon: '🔄', text: 'Combine shipments to reduce trips' }
          ].map((tip, idx) => (
            <motion.div
              key={idx}
              className="tip-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="tip-icon">{tip.icon}</div>
              <p>{tip.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarbonImpact;
