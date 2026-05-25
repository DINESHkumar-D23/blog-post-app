// import express from 'express';
// import jwt from 'jsonwebtoken';
// import dotenv from "dotenv";
// //import { createClient } from "redis";
// dotenv.config();
// //redis
// // const redisPublisher = createClient({ // this is used to publish messages to the redis cache. It is used to invalidate the cache when a new post is created, updated or deleted.
// //     url: "redis://redis:6379"
// // });

// // redisPublisher.on("error", (err) => { // this is used to log the error if any.
// //     console.error("Redis Publisher Error:", err);
// // });

// // await redisPublisher.connect();
// // console.log("Post Service Redis Connected");

// const app = express();
// //const port = 4000;
// app.use(express.json());
// import { connectDB } from "./config/db.js";
// import db from "./config/db.js";
// await connectDB();


// //mid - auth
// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;           //feteches the token from the header and checks if it is valid. If valid, it decodes the token and attaches the user information to the request object for further use in the route handlers. If the token is invalid or missing, it returns a 401 Unauthorized response.
//     if (!authHeader || !authHeader.startsWith("Bearer ")) { // checks if header start with Bearer and if not then it will return 401 error
//         return res.status(401).json({ error: "Invalid token" });
//     }
//     const token = authHeader.split(" ")[1]; // splits bearer and token and take the token part
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey"); // verifies the token using the secret key and if it is valid, it decodes the token and attaches the user information to the request object for further use in the route handlers.
//         req.user = decoded;                             // attaches the decoded user information to the request object for further use in the route handlers. it contains user id, username, email etc. depending on what information is stored in the token.
//         next();                                      // calls the next middleware or route handler in the stack.
//     } catch {
//         return res.status(401).json({ error: "Unauthorized" });
//     }
// };


// //create a post
// app.post("/posts", authMiddleware, async (req, res) => {
//     const title = req.body.title;
//     const content = req.body.content;
//     const author_id = req.user.id;

//     if (!title || !content) {
//         return res.status(400).json({ error: "Title and content are required" });
//     }

//     try {
//         const result = await db.query(
//             "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *",
//             [title, content, author_id]
//         );
//         res.status(201).json({
//             message: "Post created successfully",
//             post: result.rows[0],
//         });
//     }
//     catch (error) {
//         console.error("Error creating post:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// app.get("/posts", async (req, res) => {
//     try {
//         const result = await db.query("SELECT * FROM posts ORDER BY created_at DESC");
//         res.status(200).json(result.rows);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch posts" });
//     }
// });
// app.get("/my-posts", authMiddleware, async (req, res) => {
//     const author_id = req.user.id;

//     try {
//         const result = await db.query(
//             "SELECT * FROM posts WHERE author_id = $1 ORDER BY created_at DESC",
//             [author_id]
//         );

//         res.json(result.rows);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch user posts" });
//     }
// });
// //get single post
// // app.get("/posts", async (req, res) => {
// //     //get query params
// //     const page = parseInt(req.query.page) || 1;
// //     const limit = parseInt(req.query.limit) || 10;

// //     const offset = (page - 1) * limit;

// //     try {
// //         //get paginated posts
// //         const result = await db.query(
// //             "SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2",
// //             [limit, offset]
// //         );

// //         //total count (for frontend usage)
// //         const countResult = await db.query(
// //             "SELECT COUNT(*) FROM posts"
// //         );

// //         const totalPosts = parseInt(countResult.rows[0].count);

// //         res.json({
// //             page,
// //             limit,
// //             total: totalPosts,
// //             totalPages: Math.ceil(totalPosts / limit),
// //             data: result.rows
// //         });

// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: "Failed to fetch posts" });
// //     }
// // });
// // app.get("/posts/:id", async (req, res) => {
// //     const id = req.params.id;

// //     try {
// //         const result = await db.query(
// //             "SELECT * FROM posts WHERE id = $1",
// //             [id]
// //         );

// //         if (result.rows.length === 0) {
// //             return res.status(404).json({ error: "Post not found" });
// //         }

// //         res.json(result.rows[0]);

// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: "Failed to fetch post" });
// //     }
// // });
// //update a post
// // app.put("/posts/:id", authMiddleware, async (req, res) => {
// //     const id = req.params.id;
// //     const { title, content } = req.body;
// //     const author_id = req.user.id;

// //     try {
// //         const result = await db.query(
// //             "UPDATE posts SET title = $1, content = $2 WHERE id = $3 AND author_id = $4 RETURNING *",
// //             [title, content, id, author_id]
// //         );

// //         if (result.rows.length === 0) {
// //             return res.status(403).json({ error: "Not allowed or post not found" });
// //         }

// //         res.json({
// //             message: "Post updated",
// //             post: result.rows[0]
// //         });

// //     } catch (err) {
// //         res.status(500).json({ error: "Update failed" });
// //     }
// // });
// //patch a post
// // app.patch("/posts/:id", authMiddleware, async (req, res) => {
// //     const id = req.params.id;
// //     const author_id = req.user.id;

// //     const fields = [];
// //     const values = [];
// //     let index = 1;

// //     if (req.body.title) {
// //         fields.push(`title = $${index++}`);
// //         values.push(req.body.title);
// //     }

// //     if (req.body.content) {
// //         fields.push(`content = $${index++}`);
// //         values.push(req.body.content);
// //     }

// //     if (fields.length === 0) {
// //         return res.status(400).json({ error: "No fields to update" });
// //     }

// //     values.push(id, author_id);

// //     const query = `
// //         UPDATE posts 
// //         SET ${fields.join(", ")} 
// //         WHERE id = $${index++} AND author_id = $${index}
// //         RETURNING *
// //     `;

// //     try {
// //         const result = await db.query(query, values);

// //         if (result.rows.length === 0) {
// //             return res.status(403).json({ error: "Not allowed or not found" });
// //         }

// //         res.json({
// //             message: "Post partially updated",
// //             post: result.rows[0]
// //         });

// //     } catch (err) {
// //         res.status(500).json({ error: "Update failed" });
// //     }
// // });
// //delete a post
// // app.delete("/posts/:id", authMiddleware, async (req, res) => {
// //     const id = req.params.id;
// //     const author_id = req.user.id;

// //     try {
// //         const result = await db.query(
// //             "DELETE FROM posts WHERE id = $1 AND author_id = $2 RETURNING *",
// //             [id, author_id]
// //         );

// //         if (result.rows.length === 0) {
// //             return res.status(403).json({ error: "Not allowed or post not found" });
// //         }

// //         res.json({ message: "Post deleted" });

// //     } catch (err) {
// //         res.status(500).json({ error: "Delete failed" });
// //     }
// // });
// // app.delete("/posts/:id", authMiddleware, async (req, res) => {
// //     const postId = req.params.id;
// //     const userId = req.user.id;

// //     try {
// //         //Get post
// //         const result = await db.query(
// //             "SELECT * FROM posts WHERE id = $1",
// //             [postId]
// //         );

// //         if (result.rows.length === 0) {
// //             return res.status(404).json({
// //                 error: "Post not found"
// //             });
// //         }

// //         const post = result.rows[0];

// //         //Ownership check
// //         if (post.author_id !== userId) {
// //             return res.status(403).json({
// //                 error: "Not authorized to delete this post"
// //             });
// //         }

// //         //Delete post
// //         await db.query(
// //             "DELETE FROM posts WHERE id = $1",
// //             [postId]
// //         );

// //         res.json({
// //             message: "Post deleted successfully"
// //         });

// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({
// //             error: "Failed to delete post"
// //         });
// //     }
// // });
// app.get("/health", (req, res) => {
//     res.send("OK");
// });
// const PORT = process.env.PORT || 8080;

// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Post Service running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import pkg from "pg";
import jwt from "jsonwebtoken";
import logger from "./utils/logger.js";
import client from "prom-client";

dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(express.json());
// ================= METRICS =================
client.collectDefaultMetrics();

const httpRequests = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests"
});
//logger middleware
app.use((req, res, next) => {
    httpRequests.inc();
    logger.info(`${req.method} - ${req.url}`);
    next();
});
// ================= DB =================
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('sslmode=require') || process.env.DATABASE_URL?.includes('neon')
        ? { rejectUnauthorized: false }
        : false,
});

// ================= AUTH =================
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            error: "Invalid token format"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: "Invalid token"
        });
    }
};

// ================= RESPONSE HELPERS =================
const success = (res, data) => {
    res.json({ success: true, data, error: null });
};

const failure = (res, err, msg = "Internal error") => {
    logger.error(err.message);
    res.status(err.status || 500).json({
        success: false,
        data: null,
        error: msg
    });
};

// ================= ROUTES =================

// ROOT
app.get("/", (req, res) => {
    success(res, "Post Service Running");
});

// HEALTH
app.get("/health", (req, res) => {
    success(res, "OK");
});

// METRICS ENDPOINT
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

// CREATE POST
app.post("/posts", authMiddleware, async (req, res) => {
    const { title, content, image_url, tags, category } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            error: "title and content required"
        });
    }

    try {
        const result = await db.query(
            "INSERT INTO posts (title, content, author_id, image_url, tags, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, content, req.user.id, image_url || null, tags || null, category || null]
        );

        success(res, result.rows[0]);
    } catch (err) {
        failure(res, err, "Create post failed");
    }
});

// GET ALL POSTS
app.get("/posts", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM posts ORDER BY created_at DESC"
        );
        success(res, result.rows);
    } catch (err) {
        failure(res, err, "Fetch posts failed");
    }
});

// GET SINGLE POST
app.get("/posts/:id", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM posts WHERE id = $1",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: "Post not found"
            });
        }

        success(res, result.rows[0]);
    } catch (err) {
        failure(res, err, "Fetch post failed");
    }
});

// GET MY POSTS
app.get("/my-posts", authMiddleware, async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM posts WHERE author_id = $1 ORDER BY created_at DESC",
            [req.user.id]
        );

        success(res, result.rows);
    } catch (err) {
        failure(res, err, "Fetch my posts failed");
    }
});

// UPDATE POST
app.put("/posts/:id", authMiddleware, async (req, res) => {
    const { title, content } = req.body;

    try {
        const result = await db.query(
            "UPDATE posts SET title=$1, content=$2 WHERE id=$3 AND author_id=$4 RETURNING *",
            [title, content, req.params.id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(403).json({
                success: false,
                error: "Not allowed"
            });
        }

        success(res, result.rows[0]);
    } catch (err) {
        failure(res, err, "Update failed");
    }
});

// DELETE POST
app.delete("/posts/:id", authMiddleware, async (req, res) => {
    try {
        const result = await db.query(
            "DELETE FROM posts WHERE id=$1 AND author_id=$2 RETURNING *",
            [req.params.id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(403).json({
                success: false,
                error: "Not allowed"
            });
        }

        success(res, { message: "Deleted successfully" });
    } catch (err) {
        failure(res, err, "Delete failed");
    }
});

// ================= START =================
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", async () => {
    logger.info(`Post Service running on port ${PORT}`);
});