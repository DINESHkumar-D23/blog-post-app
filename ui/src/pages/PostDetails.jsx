import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/post-details.css";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [deleteError, setDeleteError] = useState("");
  const articleRef = useRef(null);
  const isLoggedIn = !!localStorage.getItem("token");

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      if (err.response?.status === 403) {
        setDeleteError("You can only delete your own posts.");
      } else {
        setDeleteError("Failed to delete post. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchPostAndComments();
  }, [id]);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const article = articleRef.current;
      if (!article) return;
      const { top, height } = article.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollable = height - windowHeight;
      if (scrollable <= 0) { setReadingProgress(100); return; }
      const progress = Math.min(Math.max((-top / scrollable) * 100, 0), 100);
      setReadingProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  const fetchPostAndComments = async () => {
    try {
      setLoading(true);
      setError("");

      const postRes = await API.get(`/posts/${id}`);
      const raw = postRes.data;
      const responseData = raw?.data ?? raw;

      let postData = null;
      let commentsData = [];

      if (responseData && typeof responseData === "object") {
        if ("post" in responseData) {
          postData = responseData.post;
          commentsData = responseData.comments ?? [];
        } else {
          postData = responseData;
        }
      }

      setPost(postData);
      setComments(commentsData);
    } catch (err) {
      setError("Failed to load post. Please try again.");
      console.error("Post fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Normalize a field value trying multiple possible key names
  const getField = (obj, ...keys) => {
    if (!obj) return null;
    for (const key of keys) {
      if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
        return obj[key];
      }
    }
    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Unknown Date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const getReadingTime = (content) => {
    if (!content) return "1 min read";
    const words = content.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    return `${mins} min read`;
  };

  // Split content into renderable blocks
  const parseContent = (content) => {
    if (!content) return [];
    return content.split("\n").filter((line) => line.trim() !== "");
  };

  // Auto-generate TOC items from markdown-style headings or paragraph previews
  const generateTOC = (content) => {
    if (!content) return [];
    const lines = content.split("\n");
    const items = [];
    lines.forEach((line, idx) => {
      const match = line.match(/^(#{1,3})\s+(.+)/);
      if (match) items.push({ level: match[1].length, text: match[2], id: `heading-${idx}` });
    });
    return items;
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setCommentError("");
    if (!commentText.trim()) { setCommentError("Comment cannot be empty"); return; }
    const token = localStorage.getItem("token");
    if (!token) { setCommentError("You must be logged in to comment"); return; }
    setSubmittingComment(true);
    try {
      const response = await API.post("/comments", {
        content: commentText,
        post_id: parseInt(id, 10),
      });
      const newComment = response.data?.data ?? response.data;
      setComments([...comments, newComment]);
      setCommentText("");
    } catch (err) {
      setCommentError(err.response?.data?.error || "Failed to post comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  /* ─── Loading ─── */
  if (loading) {
    return (
      <div className="pd-page">
        <div className="pd-loading-screen">
          <div className="pd-loading-orb"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  /* ─── Error ─── */
  if (error) {
    return (
      <div className="pd-page">
        <div className="pd-error-screen">
          <div className="pd-error-icon">⚠️</div>
          <h2>Failed to Load Post</h2>
          <p>{error}</p>
          <button className="pd-btn-primary" onClick={() => navigate("/")}>← Back to Home</button>
        </div>
      </div>
    );
  }

  /* ─── Not found ─── */
  if (!post) {
    return (
      <div className="pd-page">
        <div className="pd-error-screen">
          <div className="pd-error-icon">📭</div>
          <h2>Post Not Found</h2>
          <p>This post may have been removed or doesn't exist.</p>
          <button className="pd-btn-primary" onClick={() => navigate("/")}>← Back to Home</button>
        </div>
      </div>
    );
  }

  /* ─── Normalize API field names (snake_case / camelCase / PascalCase) ─── */
  const title    = getField(post, "title",      "Title",      "post_title")   || "Untitled Post";
  const content  = getField(post, "content",    "Content",    "body",  "Body") || "";
  const author   = getField(post, "author",     "Author",     "username", "user") || "Anonymous";
  const createdAt= getField(post, "created_at", "CreatedAt",  "created", "date", "publishedAt");
  const category = getField(post, "category",   "Category");
  const tags     = getField(post, "tags",        "Tags");
  const imageUrl = getField(post, "image_url",   "ImageURL",  "image", "thumbnail");

  const paragraphs = parseContent(content);
  const toc        = generateTOC(content);
  const readingTime= getReadingTime(content);
  const tagList    = tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  /* ─── Render ─── */
  return (
    <div className="pd-page" ref={articleRef}>
      {/* Reading Progress */}
      <div className="pd-progress-bar" style={{ width: `${readingProgress}%` }} />

      {/* Sticky top nav */}
      <div className="pd-topnav">
        <div className="pd-topnav-inner">
          <button className="pd-back-link" onClick={() => navigate("/")}>
            ← Back to Posts
          </button>
          <div className="pd-breadcrumb">
            <span>Home</span>
            <span className="pd-bc-sep">›</span>
            {category && (
              <>
                <span>{category}</span>
                <span className="pd-bc-sep">›</span>
              </>
            )}
            <span className="pd-bc-current">{title}</span>
          </div>
          {isLoggedIn && (
            <div className="pd-topnav-actions">
              <button
                className="pd-action-edit"
                onClick={() => navigate(`/edit-post/${id}`)}
              >
                ✏️ Edit
              </button>
              <button
                className="pd-action-delete"
                onClick={handleDeletePost}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
        {deleteError && (
          <div className="pd-delete-error">{deleteError}</div>
        )}
      </div>

      {/* Hero Image */}
      {imageUrl && (
        <div className="pd-hero">
          <img src={imageUrl} alt={title} className="pd-hero-img" />
          <div className="pd-hero-fade" />
        </div>
      )}

      {/* Two-column layout */}
      <div className="pd-layout">
        {/* ── Sidebar ── */}
        <aside className="pd-sidebar">
          {/* Table of Contents */}
          <div className="pd-toc">
            <div className="pd-toc-header">
              <span>📋</span> Contents
            </div>
            <nav className="pd-toc-nav">
              <a href="#pd-body" className="pd-toc-link pd-toc-overview">Overview</a>
              {toc.length > 0
                ? toc.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className={`pd-toc-link pd-toc-l${item.level}`}
                    >
                      {idx + 1}. {item.text}
                    </a>
                  ))
                : paragraphs.slice(0, 5).map((para, idx) => (
                    <a key={idx} href="#pd-body" className="pd-toc-link pd-toc-l2">
                      {idx + 1}. {para.replace(/^#{1,3}\s+/, "").substring(0, 38)}
                      {para.length > 38 ? "…" : ""}
                    </a>
                  ))}
            </nav>
          </div>

          {/* Author Card */}
          <div className="pd-author-card">
            <div className="pd-author-avatar-lg">
              {(author || "A").charAt(0).toUpperCase()}
            </div>
            <div className="pd-author-name">{author}</div>
            <div className="pd-author-role">Author</div>
            <div className="pd-author-date">{formatDate(createdAt)}</div>
          </div>
        </aside>

        {/* ── Main Article ── */}
        <main className="pd-main">
          <header className="pd-header">
            <div className="pd-meta-top">
              {category && <span className="pd-category-badge">{category}</span>}
              <span className="pd-reading-time">📖 {readingTime}</span>
            </div>

            <h1 className="pd-title">{title}</h1>

            <div className="pd-byline">
              <div className="pd-byline-left">
                <div className="pd-byline-avatar">
                  {(author || "A").charAt(0).toUpperCase()}
                </div>
                <div className="pd-byline-info">
                  <span className="pd-byline-name">
                    By <strong>{author}</strong>
                  </span>
                  <span className="pd-bc-sep">·</span>
                  <time className="pd-byline-date">{formatDate(createdAt)}</time>
                  {formatTime(createdAt) && (
                    <>
                      <span className="pd-bc-sep">·</span>
                      <span className="pd-byline-time">{formatTime(createdAt)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="pd-header-divider" />
          </header>

          {/* Article Body */}
          <div className="pd-body" id="pd-body">
            {paragraphs.length > 0 ? (
              paragraphs.map((para, idx) => {
                // IMPORTANT: check most-specific prefix first (### before ## before #)
                const h3 = para.match(/^###\s+(.+)/);
                const h2 = para.match(/^##\s+(.+)/);
                const h1 = para.match(/^#\s+(.+)/);
                if (h3) return <h4 key={idx} id={`heading-${idx}`} className="pd-sub-title">{h3[1]}</h4>;
                if (h2) return <h3 key={idx} id={`heading-${idx}`} className="pd-subsection-title">{h2[1]}</h3>;
                if (h1) return <h2 key={idx} id={`heading-${idx}`} className="pd-section-title">{h1[1]}</h2>;
                return (
                  <p key={idx} className={`pd-paragraph${idx === 0 ? " pd-first-para" : ""}`}>
                    {para}
                  </p>
                );
              })
            ) : (
              <div className="pd-empty-body">
                <div className="pd-empty-icon">📝</div>
                <p>No content available for this post.</p>
              </div>
            )}
          </div>

          {/* Tags */}
          {tagList.length > 0 && (
            <div className="pd-tags-row">
              <span className="pd-tags-label">Tags:</span>
              <div className="pd-tags-wrap">
                {tagList.map((tag, idx) => (
                  <span key={idx} className="pd-tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Article footer */}
          <div className="pd-article-footer">
            <span>Published {formatDate(createdAt)}</span>
            {category && (
              <span>
                in <strong>{category}</strong>
              </span>
            )}
          </div>
        </main>
      </div>

      {/* ── Comments Section ── */}
      <section className="pd-comments-section">
        <div className="pd-comments-inner">
          <div className="pd-comments-head">
            <h2 className="pd-comments-title">
              💬 Discussion
              <span className="pd-comments-count">
                {comments.length} {comments.length === 1 ? "comment" : "comments"}
              </span>
            </h2>
            <div className="pd-comments-divider" />
          </div>

          {/* Comment form */}
          {localStorage.getItem("token") ? (
            <div className="pd-form-wrap">
              <form onSubmit={handleSubmitComment} className="pd-comment-form">
                {commentError && (
                  <div className="pd-comment-error">{commentError}</div>
                )}
                <div className="pd-form-row">
                  <div className="pd-form-avatar">
                    {(localStorage.getItem("userEmail") || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="pd-form-inputs">
                    <textarea
                      className="pd-comment-textarea"
                      placeholder="Share your thoughts about this article..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows="4"
                      disabled={submittingComment}
                    />
                    <div className="pd-form-actions">
                      <button
                        type="submit"
                        className="pd-btn-comment"
                        disabled={submittingComment || !commentText.trim()}
                      >
                        {submittingComment ? "Publishing…" : "Post Comment"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="pd-login-prompt">
              <div className="pd-login-icon">🔐</div>
              <div className="pd-login-text">
                <strong>Join the conversation</strong>
                <p>Sign in to share your thoughts and engage with the community.</p>
              </div>
              <button className="pd-btn-primary" onClick={() => navigate("/login")}>
                Sign In to Comment
              </button>
            </div>
          )}

          {/* Comments list */}
          {comments.length === 0 ? (
            <div className="pd-no-comments">
              <div className="pd-no-comments-icon">💭</div>
              <p>No comments yet. Start the conversation!</p>
            </div>
          ) : (
            <div className="pd-comments-list">
              {comments.map((comment, idx) => {
                const cAuthor  = getField(comment, "author",     "Author",  "user",    "username") || "Anonymous";
                const cContent = getField(comment, "content",    "Content", "text",    "body")     || "";
                const cDate    = getField(comment, "created_at", "CreatedAt", "created");
                return (
                  <div key={comment.id || idx} className="pd-comment-card">
                    <div className="pd-comment-avatar">
                      {(cAuthor || "A").charAt(0).toUpperCase()}
                    </div>
                    <div className="pd-comment-body">
                      <div className="pd-comment-header">
                        <strong className="pd-comment-name">{cAuthor}</strong>
                        <time className="pd-comment-time">{formatDate(cDate)}</time>
                      </div>
                      <p className="pd-comment-text">{cContent}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
