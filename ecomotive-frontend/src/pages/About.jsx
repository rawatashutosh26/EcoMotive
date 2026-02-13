import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const features = [
    {
      icon: '🗺️',
      title: 'Multi-Modal Routing',
      description: 'Optimize routes across truck, rail, and ship transport modes'
    },
    {
      icon: '⚡',
      title: 'Real-Time Optimization',
      description: 'Calculate optimal paths instantly using Dijkstra\'s algorithm'
    },
    {
      icon: '🌿',
      title: 'Carbon Footprint Tracking',
      description: 'Monitor and reduce CO₂ emissions with every route'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into your logistics network'
    },
    {
      icon: '💰',
      title: 'Cost Optimization',
      description: 'Balance cost, time, and environmental impact'
    },
    {
      icon: '🏢',
      title: 'Hub Management',
      description: 'Easily manage your network hubs and connections'
    }
  ];

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'Spring Boot', icon: '☕' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'PostGIS', icon: '🗺️' },
    { name: 'Leaflet', icon: '📍' },
    { name: 'Dijkstra', icon: '🔍' }
  ];

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

  return (
    <motion.div
      className="about-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="about-hero" variants={itemVariants}>
        <motion.div
          className="hero-icon"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          🚛
        </motion.div>
        <h1>EcoMotive</h1>
        <p className="hero-subtitle">Multi-Modal Logistics Optimization Platform</p>
        <p className="hero-description">
          EcoMotive helps supply chain managers find the best way to move goods between cities
          by balancing Cost, Time, and Carbon Emissions (CO₂).
        </p>
      </motion.div>

      <motion.section className="about-section" variants={itemVariants}>
        <h2>How It Works</h2>
        <div className="how-it-works">
          <motion.div className="step-card" whileHover={{ scale: 1.05 }}>
            <div className="step-number">1</div>
            <h3>Visualize Network</h3>
            <p>View your supply chain network with hubs and routes plotted on an interactive map</p>
          </motion.div>
          <motion.div className="step-card" whileHover={{ scale: 1.05 }}>
            <div className="step-number">2</div>
            <h3>Calculate Routes</h3>
            <p>Select origin, destination, and priority (Cost, Time, or CO₂) to find optimal paths</p>
          </motion.div>
          <motion.div className="step-card" whileHover={{ scale: 1.05 }}>
            <div className="step-number">3</div>
            <h3>Optimize</h3>
            <p>Our algorithm scans the network using Dijkstra's algorithm to find the perfect route</p>
          </motion.div>
          <motion.div className="step-card" whileHover={{ scale: 1.05 }}>
            <div className="step-number">4</div>
            <h3>Track Impact</h3>
            <p>Monitor your carbon footprint and savings with detailed analytics</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="about-section" variants={itemVariants}>
        <h2>Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="about-section" variants={itemVariants}>
        <h2>Technology Stack</h2>
        <div className="tech-grid">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              className="tech-card"
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
            >
              <div className="tech-icon">{tech.icon}</div>
              <div className="tech-name">{tech.name}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="about-section" variants={itemVariants}>
        <h2>Why EcoMotive?</h2>
        <div className="why-section">
          <motion.div className="why-card" whileHover={{ scale: 1.02 }}>
            <h3>🌍 Environmental Impact</h3>
            <p>Reduce your carbon footprint by choosing optimal routes that minimize CO₂ emissions</p>
          </motion.div>
          <motion.div className="why-card" whileHover={{ scale: 1.02 }}>
            <h3>💰 Cost Efficiency</h3>
            <p>Save money by finding the most cost-effective routes across different transport modes</p>
          </motion.div>
          <motion.div className="why-card" whileHover={{ scale: 1.02 }}>
            <h3>⏱️ Time Optimization</h3>
            <p>Minimize delivery times by selecting the fastest available routes</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.footer className="about-footer" variants={itemVariants}>
        <p>Built with ❤️ for sustainable logistics</p>
        <p className="footer-subtext">© 2026 EcoMotive. All rights reserved.</p>
      </motion.footer>
    </motion.div>
  );
};

export default About;
