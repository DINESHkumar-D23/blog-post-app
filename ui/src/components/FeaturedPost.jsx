import { useNavigate } from "react-router-dom";
import "../styles/featured-post.css";

export default function FeaturedPost({ post }) {
  const navigate = useNavigate();

  if (!post) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getExcerpt = (content) => {
    return content.length > 220 ? content.substring(0, 220) + "..." : content;
  };

  return (
    <section className="featured-section">
      <div className="featured-container">
        <div className="featured-label">
          <span className="featured-label-dot"></span>
          Featured Story
        </div>

        <div className="featured-card" onClick={() => navigate(`/post/${post.id}`)}>
          <div className="featured-image">
            {post.image_url ? (
              <img src={post.image_url} alt={post.title} className="featured-img" />
            ) : (
              <div className="featured-image-placeholder">📰</div>
            )}
          </div>

          <div className="featured-content">
            <div className="featured-meta">
              <span className="featured-author">{post.author || "Anonymous"}</span>
              <span className="featured-date">{formatDate(post.created_at || new Date())}</span>
            </div>

            <h2 className="featured-title">{post.title}</h2>

            <p className="featured-excerpt">{getExcerpt(post.content)}</p>

            <button
              className="featured-read-btn"
              onClick={(e) => { e.stopPropagation(); navigate(`/post/${post.id}`); }}
            >
              Read Full Story
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
