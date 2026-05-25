// import express from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import db, { connectDB } from "./config/db.js";
// dotenv.config();

// console.log("App started");

// const app = express();

// app.use(express.json());

// // connect DB
// await connectDB();

// // root route
// app.get("/", (req, res) => {
//     res.send("Welcome to User Service");
// });

// // SIGNUP 
// app.post("/signup", async (req, res) => {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);

//         const result = await db.query(
//             "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
//             [username, email, hashPassword]
//         );
//         const { password: _, ...safeUser } = result.rows[0];

//         res.status(201).json({
//             message: "User created",
//             user: safeUser,
//         });

//     } catch (err) {
//         console.error(err);
//         if (err.code === "23505") {
//             return res.status(400).json({ error: "Email already exists" });
//         }

//         res.status(500).json({ error: "User creation failed" });
//     }
// });

// // AUTH MIDDLEWARE
// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     // 🔹 check format
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ error: "Invalid token format" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET || "secretkey"
//         );
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(401).json({ error: "Invalid token" });
//     }
// };

// // PROTECTED ROUTE 
// app.get("/profile", authMiddleware, (req, res) => {
//     res.json({
//         message: "Protected route accessed",
//         user: req.user
//     });
// });

// //LOGIN
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     // 🔹 validation
//     if (!email || !password) {
//         return res.status(400).json({ error: "Email and password are required" });
//     }

//     try {
//         const result = await db.query(
//             "SELECT id, username, email, password FROM users WHERE email = $1",
//             [email]
//         );

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const user = result.rows[0];

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }

//         const token = jwt.sign(
//             { id: user.id, email: user.email },
//             process.env.JWT_SECRET
//         );

//         res.status(200).json({
//             message: "Login successful",
//             token,
//             user: {
//                 id: user.id,
//                 username: user.username,
//                 email: user.email
//             }
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Login failed" });
//     }
// });
// app.get("/health", (req, res) => {
//     res.send("OK");
// });
// const PORT = process.env.PORT || 8080;

// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`User Service running on port ${PORT}`);
// });

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pkg from "pg";
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
    user: "postgres",
    host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    database: "blog_db",
    password: process.env.DB_PASSWORD,
    port: 5432,
});
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

// ================= AUTH MIDDLEWARE =================
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

// ================= ROUTES =================

// ROOT
app.get("/", (req, res) => {
    success(res, "User Service Running");
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

// SIGNUP
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            error: "All fields required"
        });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const result = await db.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
            [username, email, hashPassword]
        );

        success(res, result.rows[0]);

    } catch (err) {
        if (err.code === "23505") {
            return res.status(400).json({
                success: false,
                error: "Email already exists"
            });
        }
        failure(res, err, "Signup failed");
    }
});

// LOGIN
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: "Email and password required"
        });
    }

    try {
        const result = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "secretkey",
            { expiresIn: "1d" }
        );

        success(res, {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        failure(res, err, "Login failed");
    }
});

// PROFILE
app.get("/profile", authMiddleware, async (req, res) => {
    try {
        const result = await db.query(
            "SELECT id, username, email FROM users WHERE id = $1",
            [req.user.id]
        );

        success(res, result.rows[0]);
    } catch (err) {
        failure(res, err, "Fetch profile failed");
    }
});

// ================= START =================
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", async () => {
    logger.info(`User Service running on port ${PORT}`);
});