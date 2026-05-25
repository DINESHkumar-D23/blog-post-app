import { useNavigate } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="premium-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <span className="footer-logo-icon">✨</span>
              <span className="footer-logo-text">My Blog</span>
            </div>
            <p className="footer-description">
              A modern platform for sharing ideas, building stories, and inspiring people around the world.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => navigate("/")} className="footer-link">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/posts")} className="footer-link">
                  Explore Posts
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/create-post")} className="footer-link">
                  Write
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Connect</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">Twitter</a>
              </li>
              <li>
                <a href="#" className="footer-link">LinkedIn</a>
              </li>
              <li>
                <a href="#" className="footer-link">GitHub</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">Privacy</a>
              </li>
              <li>
                <a href="#" className="footer-link">Terms</a>
              </li>
              <li>
                <a href="#" className="footer-link">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} My Blog. Crafted with care. All rights reserved.
          </p>
          <p className="footer-tagline">
            Where stories meet inspiration
          </p>
        </div>
      </div>
    </footer>
  );
}
