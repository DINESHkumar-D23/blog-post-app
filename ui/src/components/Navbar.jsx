import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

export default function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar-premium">
      <div className="navbar-container-premium">
        <div className="navbar-brand-premium">
          <button 
            className="logo-btn-premium"
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="logo-icon">✨</span>
            <span className="logo-text">My Blog</span>
          </button>
        </div>

        <button 
          className="mobile-menu-btn-premium"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu-premium ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <button
              className={`nav-link-premium ${isActive("/")}`}
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
            >
              Home
            </button>
          </li>

          <li>
            <button
              className={`nav-link-premium ${isActive("/posts")}`}
              onClick={() => {
                navigate("/posts");
                setIsMobileMenuOpen(false);
              }}
            >
              Posts
            </button>
          </li>

          {!isLoggedIn ? (
            <>
              <li>
                <button
                  className={`nav-link-premium ${isActive("/login")}`}
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className={`nav-link-premium signup-btn-premium ${isActive("/signup")}`}
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  className={`nav-link-premium ${isActive("/create-post")}`}
                  onClick={() => {
                    navigate("/create-post");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Create
                </button>
              </li>
              <li>
                <button
                  className="nav-link-premium logout-btn-premium"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
