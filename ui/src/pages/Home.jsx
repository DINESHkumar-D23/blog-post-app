import { useState, useEffect } from "react";
import API from "../api";
import Hero from "../components/Hero";
import FeaturedPost from "../components/FeaturedPost";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import "../styles/home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/posts");
      setPosts(res.data.data || []);
    } catch (err) {
      setError("Failed to load posts. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/posts/${postId}`);
      // Optimistically remove from state
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      if (err.response?.status === 403) {
        setError("You can only delete your own posts.");
      } else {
        setError("Failed to delete post. Please try again.");
      }
    }
  };

  const featuredPost = posts.find(p => p.is_featured) || null;
  const regularPosts = posts.filter(p => !p.is_featured);

  return (
    <div className="home-page">
      <Hero isLoggedIn={isLoggedIn} />

      {featuredPost && <FeaturedPost post={featuredPost} />}

      <section className="posts-section">
        <div className="posts-container">
          <div className="posts-header">
            <div className="posts-header-content">
              <h2>Latest Stories</h2>
              <p className="posts-subtitle">Explore our newest posts from talented writers</p>
            </div>
            <button className="refresh-btn" onClick={fetchPosts} disabled={loading}>
              <span className={loading ? "spinner-small" : ""}>{loading ? "Loading..." : "Refresh"}</span>
            </button>
          </div>

          {error && (
            <div className="error-banner">
              <div className="error-icon">⚠️</div>
              <div className="error-content">
                <p>{error}</p>
                <button onClick={fetchPosts} className="retry-btn">Try Again</button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading amazing stories...</p>
            </div>
          ) : regularPosts.length === 0 ? (
            <div className="no-posts">
              <div className="no-posts-icon">📭</div>
              <p className="no-posts-title">No Stories Yet</p>
              <p className="no-posts-subtitle">Be the first to share your story with our community!</p>
            </div>
          ) : (
            <div className="posts-grid">
              {regularPosts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post}
                  onDelete={handleDeletePost}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
