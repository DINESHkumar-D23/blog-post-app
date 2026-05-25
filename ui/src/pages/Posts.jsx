import { useEffect, useState } from "react";
import API from "../api";
import "./Posts.css";

export default function Posts({ token, setToken }) {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchPosts = async () => {
    try {
      setFetchLoading(true);

      const res = await API.get("/posts");

      setPosts(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      setError("All fields required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await API.post("/posts", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Post created successfully");

      setForm({
        title: "",
        content: "",
      });

      fetchPosts();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchPosts();
    } catch (err) {
      setError("Failed to delete post");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="page">

      <div className="navbar">
        <h1>📝 My Blog</h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container">

        <div className="create-post">

          <h2>Create New Post</h2>

          {error && <div className="error">{error}</div>}

          {success && <div className="success">{success}</div>}

          <form onSubmit={handleCreatePost}>

            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={form.title}
              onChange={handleChange}
            />

            <textarea
              name="content"
              placeholder="Write your post..."
              value={form.content}
              onChange={handleChange}
            ></textarea>

            <button type="submit">
              {loading ? "Creating..." : "Create Post"}
            </button>

          </form>
        </div>

        <div className="posts-section">

          <h2>Latest Posts</h2>

          {fetchLoading ? (
            <p className="loading">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => (
              <div className="post-card" key={post.id}>

                <h2>{post.title}</h2>

                <small className="date">
                  {formatDate(post.created_at || new Date())}
                </small>

                <p>{post.content}</p>

                <small className="author">
                  By: {post.author || "Anonymous"}
                </small>

                <div className="actions">

                  <button className="edit-btn">
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}