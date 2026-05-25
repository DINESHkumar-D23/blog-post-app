import { Link, useNavigate } from "react-router-dom";
import "../styles/postcard.css";

export default function PostCard({ post, onDelete }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const formatDate = (date) => {
    if (!date) return "Unknown Date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Only show up to 3 tags to keep cards compact
  const tags = post.tags
    ? post.tags.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 3)
    : [];

  return (
    <article className="post-card">
      {/* ── Image ── */}
      <div className="post-image-container">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            className="post-image"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "grid";
            }}
          />
        ) : null}
        <div
          className="post-placeholder"
          style={{ display: post.image_url ? "none" : "grid" }}
        >
          📄
        </div>
      </div>

      {/* ── Content ── */}
      <div className="post-content">
        {/* Meta row */}
        <div className="post-meta">
          <span className="post-date">{formatDate(post.created_at)}</span>
          <span className="post-category">{post.category || "General"}</span>
          <span className="post-author">{post.author || "Anonymous"}</span>
        </div>

        {/* Title */}
        <h3 className="post-title">{post.title}</h3>

        {/* Excerpt — let CSS line-clamp handle truncation */}
        {post.content && (
          <p className="post-excerpt">{post.content}</p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="post-tags">
            {tags.map((tag, index) => (
              <span key={index} className="post-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="post-footer">
          <Link to={`/post/${post.id}`} className="read-more-btn">
            Read →
          </Link>

          {isLoggedIn && (
            <div className="post-actions">
              <button
                className="action-btn edit-btn"
                onClick={() => navigate(`/edit-post/${post.id}`)}
                title="Edit post"
              >
                Edit
              </button>
              <button
                className="action-btn delete-btn"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete && onDelete(post.id);
                }}
                title="Delete post"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}