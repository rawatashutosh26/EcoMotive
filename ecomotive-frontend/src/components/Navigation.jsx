import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🗺️' },
    { path: '/analytics', label: 'Network Analytics', icon: '📊' },
    { path: '/history', label: 'Route History', icon: '📜' },
    { path: '/carbon', label: 'Carbon Impact', icon: '🌱' },
    { path: '/hubs', label: 'Hub Management', icon: '🏢' },
    { path: '/about', label: 'About', icon: 'ℹ️' }
  ];

  return (
    <motion.nav 
      className="navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="nav-brand"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="brand-icon">🚛</span>
        <span className="brand-text">EcoMotive</span>
      </motion.div>
      
      <div className="nav-links">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <motion.span
                  className="nav-icon"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.span>
                <span className="nav-label">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="nav-indicator"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
