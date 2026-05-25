import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/create-post.css";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    image_url: "",
    tags: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setFetchLoading(true);
        const res = await API.get(`/posts/${id}`);
        const raw = res.data?.data ?? res.data;
        const post = raw?.post ?? raw;
        if (post) {
          setForm({
            title: post.title || "",
            content: post.content || "",
            image_url: post.image_url || "",
            tags: post.tags || "",
            category: post.category || "",
          });
        }
      } catch (err) {
        setError("Failed to load post for editing.");
      } finally {
        setFetchLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title.trim() || !form.content.trim()) {
      setError("Please fill in title and content");
      return;
    }

    setLoading(true);
    try {
      await API.put(`/posts/${id}`, form);
      setSuccess("Post updated successfully!");
      setTimeout(() => {
        navigate(`/post/${id}`);
      }, 1500);
    } catch (err) {
      if (err.response?.status === 403) {
        setError("You can only edit your own posts.");
      } else {
        setError(err.response?.data?.error || "Failed to update post. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="create-post-page">
        <div className="create-post-container">
          <p style={{ textAlign: "center", padding: "2rem" }}>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="create-post-page">
      <div className="create-post-container">
        <div className="create-post-header">
          <h1>Edit <span>Post</span></h1>
          <p>// Update your story</p>
        </div>

        {error && <div className="error-banner">{error}</div>}
        {success && <div className="success-banner">✓ {success}</div>}

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="edit-title">Post Title *</label>
            <input
              id="edit-title"
              type="text"
              name="title"
              placeholder="Enter your post title"
              value={form.title}
              onChange={handleChange}
              required
              disabled={loading}
              maxLength="200"
            />
            <small className="char-count">{form.title.length} / 200</small>
          </div>

          <div className="form-group">
            <label htmlFor="edit-image_url">Post Image URL (optional)</label>
            <input
              id="edit-image_url"
              type="url"
              name="image_url"
              placeholder="https://example.com/image.jpg"
              value={form.image_url}
              onChange={handleChange}
              disabled={loading}
            />
            {form.image_url && (
              <img
                src={form.image_url}
                alt="Preview"
                className="image-preview"
                onError={(e) => { e.target.style.display = "none"; }}
                onLoad={(e) => { e.target.style.display = "block"; }}
              />
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-category">Category</label>
              <select
                id="edit-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
                <option value="Travel">Travel</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="edit-tags">Tags (comma-separated)</label>
              <input
                id="edit-tags"
                type="text"
                name="tags"
                placeholder="e.g. coding, web, react"
                value={form.tags}
                onChange={handleChange}
                disabled={loading}
                maxLength="200"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-content">Content *</label>
            <textarea
              id="edit-content"
              name="content"
              placeholder="Write your post content here..."
              value={form.content}
              onChange={handleChange}
              required
              disabled={loading}
              rows="12"
              maxLength="5000"
            ></textarea>
            <small className="char-count">{form.content.length} / 5000</small>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? "Saving..." : "Save Changes →"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/post/${id}`)}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
