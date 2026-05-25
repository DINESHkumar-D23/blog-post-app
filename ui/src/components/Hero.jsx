import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/hero.css";

export default function Hero({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleCTA = () => {
    if (isLoggedIn) {
      navigate("/create-post");
    } else {
      navigate("/signup");
    }
  };

  return (
    <section className="hero-section">
      {/* BACKGROUND */}
      <div className="hero-bg-layer">
        <div className="hero-noise"></div>
        <div className="hero-grid"></div>

        {/* SPOTLIGHTS */}
        <div className="spotlight spotlight-left"></div>
        <div className="spotlight spotlight-right"></div>

        {/* GLOW BLOBS */}
        <motion.div
          className="blob blob-1"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="blob blob-2"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* GLOBE — corrected with particles and glow */}
        <div className="hero-globe">
          <div className="globe-glow"></div>
          <div className="globe-ring ring-1"></div>
          <div className="globe-ring ring-2"></div>
          <div className="globe-ring ring-3"></div>
          <div className="globe-particle"></div>
          <div className="globe-particle"></div>
          <div className="globe-particle"></div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ✦ POWERED BY YOUR IMAGINATION
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Share Ideas.
          <br />
          Build Stories.
          <br />
          <span className="gradient-text">Inspire People.</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Welcome to a modern blogging platform where your thoughts
          come to life. Create, share, and discover stories that matter.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button className="hero-btn primary" onClick={handleCTA}>
            {isLoggedIn ? "Create Your Post" : "Start Writing"} →
          </button>

          <button
            className="hero-btn secondary"
            onClick={() => {
              document.querySelector(".posts-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Posts ↓
          </button>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div>
            <span>∞</span>
            <p>Stories</p>
          </div>
          <div>
            <span>∞</span>
            <p>Ideas</p>
          </div>
          <div>
            <span>∞</span>
            <p>Voices</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}