import { useState, useEffect } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import "../styles/all-posts.css";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Technology", "Lifestyle", "Business", "Travel", "Health", "Education", "Entertainment", "Other"];

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
      setError("Failed to load posts. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      setError("");
      await API.delete(`/posts/${postId}`);
      // Optimistically remove the post from state without a full refetch
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      if (err.response?.status === 403) {
        setError("You can only delete your own posts.");
      } else {
        setError("Failed to delete post. Please try again.");
      }
    }
  };

  // Filter posts by search + category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.content?.toLowerCase().includes(search.toLowerCase()) ||
      post.author?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="all-posts-page">
      {/* ── PAGE HEADER ── */}
      <div className="ap-header-section">
        <div className="ap-header-inner">
          <div className="ap-header-text">
            <div className="ap-header-label">// ALL STORIES</div>
            <h1 className="ap-header-title">
              Browse <span>Every</span>
              <br />Post
            </h1>
            <p className="ap-header-sub">
              {posts.length} {posts.length === 1 ? "story" : "stories"} and counting
            </p>
          </div>

          {/* ── SEARCH ── */}
          <div className="ap-search-wrap">
            <span className="ap-search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search posts, authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ap-search-input"
              id="ap-search"
            />
            {search && (
              <button className="ap-search-clear" onClick={() => setSearch("")}>✕</button>
            )}
          </div>
        </div>
      </div>

      {/* ── CATEGORY FILTER TABS ── */}
      <div className="ap-filters-bar">
        <div className="ap-filters-inner">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`ap-filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
          <button className="ap-refresh-btn" onClick={fetchPosts} disabled={loading}>
            {loading ? "↻" : "↻ Refresh"}
          </button>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="ap-content">
        <div className="ap-content-inner">
          {error && (
            <div className="ap-error">
              <span>⚠ {error}</span>
              <button onClick={fetchPosts}>Retry</button>
            </div>
          )}

          {loading ? (
            <div className="ap-loading">
              <div className="ap-spinner"></div>
              <p>Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="ap-empty">
              <div className="ap-empty-icon">📭</div>
              <p className="ap-empty-title">
                {search || activeCategory !== "All" ? "No Matching Posts" : "No Posts Yet"}
              </p>
              <p className="ap-empty-sub">
                {search
                  ? `No results for "${search}"`
                  : activeCategory !== "All"
                  ? `No posts in "${activeCategory}" yet`
                  : "Be the first to write something!"}
              </p>
              {(search || activeCategory !== "All") && (
                <button
                  className="ap-clear-btn"
                  onClick={() => { setSearch(""); setActiveCategory("All"); }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="ap-results-info">
                {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
                {activeCategory !== "All" && ` in "${activeCategory}"`}
                {search && ` matching "${search}"`}
              </div>
              <div className="ap-grid">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
