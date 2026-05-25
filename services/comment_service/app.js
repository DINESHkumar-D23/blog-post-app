// import express from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import db from "./config/db.js";

// dotenv.config();

// const app = express();
// app.use(express.json());

// await connectDB();

// // Auth middleware
// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ error: "Invalid token" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET || "secretkey"
//         );
//         req.user = decoded;
//         next();
//     } catch {
//         return res.status(401).json({ error: "Unauthorized" });
//     }
// };

// // Create comment
// app.post("/comments", authMiddleware, async (req, res) => {
//     const { content, post_id } = req.body;
//     const author_id = req.user.id;

//     if (!content || !post_id) {
//         return res.status(400).json({ error: "Missing fields" });
//     }

//     try {
//         const result = await db.query(
//             "INSERT INTO comments (content, post_id, author_id) VALUES ($1, $2, $3) RETURNING *",
//             [content, post_id, author_id]
//         );

//         res.status(201).json({
//             message: "Comment created",
//             comment: result.rows[0]
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Failed to create comment" });
//     }
// });

// // Get comments by post
// // app.get("/posts/:id/comments", async (req, res) => {
// //     const post_id = req.params.id;

// //     try {
// //         const result = await db.query(`
// //             SELECT
// //                 comments.id,
// //                 comments.content,
// //                 users.username AS author,
// //                 comments.created_at
// //             FROM comments
// //             JOIN users ON comments.author_id = users.id
// //             WHERE comments.post_id = $1
// //             ORDER BY comments.created_at DESC
// //         `, [post_id]);

// //         res.json(result.rows);

// //     } catch (err) {
// //         res.status(500).json({ error: "Failed to fetch comments" });
// //     }
// // });
// app.get("/comments/:postId", async (req, res) => {
//     const postId = req.params.postId;

//     try {
//         const result = await db.query(
//             "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC",
//             [postId]
//         );

//         res.json(result.rows);

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Failed to fetch comments" });
//     }
// });
// //Delete comment
// // app.delete("/comments/:id", authMiddleware, async (req, res) => {
// //     const id = req.params.id;
// //     const author_id = req.user.id;

// //     try {
// //         const result = await db.query(
// //             "DELETE FROM comments WHERE id = $1 AND author_id = $2 RETURNING *",
// //             [id, author_id]
// //         );

// //         if (result.rows.length === 0) {
// //             return res.status(403).json({ error: "Not allowed" });
// //         }

// //         res.json({ message: "Comment deleted" });

// //     } catch (err) {
// //         res.status(500).json({ error: "Delete failed" });
// //     }
// // });

// app.get("/health", (req, res) => {
//     res.send("OK");
// });
// const PORT = process.env.PORT || 8080;

// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Comment Service running on port ${PORT}`);
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
    success(res, "Comment Service Running");
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

// CREATE COMMENT
app.post("/comments", authMiddleware, async (req, res) => {
    const { content, post_id } = req.body;

    if (!content || !post_id) {
        return res.status(400).json({
            success: false,
            error: "content and post_id required"
        });
    }

    try {
        const result = await db.query(
            "INSERT INTO comments (content, post_id, author_id) VALUES ($1, $2, $3) RETURNING *",
            [content, post_id, req.user.id]
        );

        success(res, result.rows[0]);
    } catch (err) {
        failure(res, err, "Create comment failed");
    }
});

// GET COMMENTS BY POST
app.get("/comments/:postId", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC",
            [req.params.postId]
        );

        success(res, result.rows);
    } catch (err) {
        failure(res, err, "Fetch comments failed");
    }
});

// DELETE COMMENT
app.delete("/comments/:id", authMiddleware, async (req, res) => {
    try {
        const result = await db.query(
            "DELETE FROM comments WHERE id = $1 AND author_id = $2 RETURNING *",
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
    logger.info(`Comment Service running on port ${PORT}`);

});