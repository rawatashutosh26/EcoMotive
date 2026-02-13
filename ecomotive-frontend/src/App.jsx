import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import NetworkAnalytics from './pages/NetworkAnalytics';
import RouteHistory from './pages/RouteHistory';
import CarbonImpact from './pages/CarbonImpact';
import HubManagement from './pages/HubManagement';
import About from './pages/About';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <motion.main
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<NetworkAnalytics />} />
          <Route path="/history" element={<RouteHistory />} />
          <Route path="/carbon" element={<CarbonImpact />} />
          <Route path="/hubs" element={<HubManagement />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </motion.main>
    </div>
  );
}

export default App;