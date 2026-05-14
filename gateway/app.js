// import express from "express";
// import axios from "axios";
// //import { createClient } from "redis";

// const app = express();
// app.use(express.json());

// //const PORT = 5000;

// //const user_service = "http://user_service:3000";
// //const post_service = "http://post_service:4000";
// //const comment_service = "http://comment_service:6000";

// const user_service = "https://user-service-377106650424.asia-south1.run.app";
// const post_service = "https://post-service-287096779128.asia-south1.run.app";
// const comment_service = "https://comment-service-311221747660.asia-south1.run.app";

// // const redisClient = createClient({
// //     url: 'redis://redis:6379'
// // });
// // redisClient.on("error", (err) => {
// //     console.error("Redis Error:", err);
// // });

// // await redisClient.connect();
// // console.log("Redis Connected");

// // const subscriber = redisClient.duplicate();
// // await subscriber.connect();
// // await subscriber.subscribe("post_events", (message) => {
// //     try {
// //         const event = JSON.parse(message);

// //         if (event.type === "POST_CREATED") {
// //             console.log("EVENT RECEIVED: POST_CREATED");
// //             console.log("Post Data:", event.data);
// //         }

// //     } catch (err) {
// //         console.error("Event parse error:", err);
// //     }
// // });


// //USER SERVICE
// // signup
// app.post("/signup", async (req, res) => {
//     try {
//         const response = await axios.post(`${user_service}/signup`, req.body);
//         res.status(response.status).json(response.data);
//     } catch (error) {
//         if (error.response) {
//             res.status(error.response.status).json(error.response.data);
//         } else {
//             console.error("Signup error:", error);
//             res.status(500).json({ error: "Internal server error" });
//         }
//     }
// });

// // login
// app.post("/login", async (req, res) => {
//     try {
//         const response = await axios.post(`${user_service}/login`, req.body);
//         res.status(response.status).json(response.data);
//     } catch (error) {
//         if (error.response) {
//             res.status(error.response.status).json(error.response.data);
//         } else {
//             console.error("Login error:", error);
//             res.status(500).json({ error: "Internal server error" });
//         }
//     }
// });

// //POST SERVICE
// // create post (auth required)
// app.post("/posts", async (req, res) => {
//     try {
//         const response = await axios.post(
//             `${post_service}/posts`,
//             req.body,
//             {
//                 headers: {
//                     Authorization: req.headers.authorization
//                 }
//             }
//         );
//         res.status(response.status).json(response.data);
//     } catch (error) {
//         if (error.response) {
//             res.status(error.response.status).json(error.response.data);
//         } else {
//             console.error("Create post error:", error);
//             res.status(500).json({ error: "Internal server error" });
//         }
//     }
// });

// // get all posts (public)
// app.get("/posts", async (req, res) => {
//     const page = req.query.page || 1;
//     const limit = req.query.limit || 10;

//     //const cacheKey = `posts:${page}:${limit}`;

//     try {
//         //Check cache
//         // const cachedData = await redisClient.get(cacheKey);

//         // if (cachedData) {
//         //     console.log("Cache HIT (posts)");
//         //     return res.json(JSON.parse(cachedData));
//         // }

//         // console.log("Cache MISS (posts)");

//         //2. Fetch from post service
//         const response = await axios.get(
//             `${post_service}/posts`,
//             {
//                 params: { page, limit }
//             }
//         );
//         res.json(response.data);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: "Failed to fetch posts" });
//     }
// });
// // get my posts (auth required)
// app.get("/my-posts", async (req, res) => {
//     try {
//         const response = await axios.get(
//             `${post_service}/my-posts`,
//             {
//                 headers: {
//                     Authorization: req.headers.authorization
//                 }
//             }
//         );
//         res.status(response.status).json(response.data);
//     } catch (error) {
//         if (error.response) {
//             res.status(error.response.status).json(error.response.data);
//         } else {
//             console.error("My posts error:", error);
//             res.status(500).json({ error: "Internal server error" });
//         }
//     }
// });
// // get post and comment
// app.get("/posts/:id", async (req, res) => {
//     const postId = req.params.id;
//     //const cacheKey = `post:${postId}`;

//     try {
//         // //Check cache
//         // const cachedData = await redisClient.get(cacheKey);

//         // if (cachedData) {
//         //     console.log("Cache HIT (post)");
//         //     return res.json(JSON.parse(cachedData));
//         // }

//         // console.log("Cache MISS (post)");

//         let postData = null;
//         let commentsData = [];

//         //Fetch post
//         try {
//             const postResponse = await axios.get(
//                 `${post_service}/posts/${postId}`
//             );
//             postData = postResponse.data;
//         } catch (err) {
//             console.error("Post service failed:", err.message);
//         }

//         //Fetch comments
//         try {
//             const commentResponse = await axios.get(
//                 `${comment_service}/comments/${postId}`
//             );
//             commentsData = commentResponse.data;
//         } catch (err) {
//             console.error("Comment service failed:", err.message);
//         }

//         if (!postData) {
//             return res.status(404).json({
//                 error: "Post not found",
//                 comments: commentsData
//             });
//         }

//         const finalResponse = {
//             post: postData,
//             comments: commentsData
//         };

//         // //Store in cache
//         // await redisClient.setEx(
//         //     cacheKey,
//         //     60,
//         //     JSON.stringify(finalResponse)
//         // );

//         res.json(finalResponse);

//     } catch (err) {
//         res.status(500).json({ error: "Aggregation failed" });
//     }
// });
// // update post
// app.put("/posts/:id", async (req, res) => {
//     try {
//         const response = await axios.put(
//             `${post_service}/posts/${req.params.id}`,
//             req.body,
//             {
//                 headers: {
//                     Authorization: req.headers.authorization
//                 }
//             }
//         );
//         res.status(response.status).json(response.data);
//     } catch (error) {
//         if (error.response) {
//             res.status(error.response.status).json(error.response.data);
//         } else {
//             console.error("Update error:", error);
//             res.status(500).json({ error: "Internal server error" });
//         }
//     }
// });

// // // patch post
// app.patch("/posts/:id", async (req, res) => {
//     try {
//         const response = await axios.patch(
//             `${post_service}/posts/${req.params.id}`,
//             req.body,
//             {
//                 headers: {
//                     Authorization: req.headers.authorization
//                 }
//             }
//         );
//         res.status(response.status).json(response.data);
//     } catch (error) {
//         if (error.response) {
//             res.status(error.response.status).json(error.response.data);
//         } else {
//             console.error("Patch error:", error);
//             res.status(500).json({ error: "Internal server error" });
//         }
//     }
// });

// // // delete post
// // app.delete("/posts/:id", async (req, res) => {
// //     try {
// //         const response = await axios.delete(
// //             `${post_service}/posts/${req.params.id}`,
// //             {
// //                 headers: {
// //                     Authorization: req.headers.authorization
// //                 }
// //             }
// //         );
// //         res.status(response.status).json(response.data);
// //     } catch (error) {
// //         if (error.response) {
// //             res.status(error.response.status).json(error.response.data);
// //         } else {
// //             console.error("Delete error:", error);
// //             res.status(500).json({ error: "Internal server error" });
// //         }
// //     }
// // });
// // //comment
// // create comment
// app.post("/comments", async (req, res) => {
//     try {
//         const response = await axios.post(
//             `${comment_service}/comments`,
//             req.body,
//             {
//                 headers: {
//                     Authorization: req.headers.authorization
//                 }
//             }
//         );
//         //const keys = await redisClient.keys("posts:*");
//         // if (keys.length > 0) {
//         //     await redisClient.del(keys);
//         // }

//         res.status(response.status).json(response.data);
//     } catch (err) {
//         res.status(err.response?.status || 500).json(err.response?.data);
//     }
// });

// // // get comments
// app.get("/comments/:id", async (req, res) => {
//     try {
//         const response = await axios.get(
//             `${comment_service}/comments/${req.params.id}`
//         );
//         res.json(response.data);
//     } catch (err) {
//         res.status(500).json({ error: "Failed" });
//     }
// });
// // DELETE post (WITH cache invalidation)
// app.delete("/comments/:id", async (req, res) => {
//     const commentId = req.params.id;

//     try {
//         const response = await axios.delete(
//             `${comment_service}/comments/${commentId}`,
//             {
//                 headers: {
//                     Authorization: req.headers.authorization
//                 }
//             }
//         );

//         // Cache invalidation
//         // await redisClient.del(`post:${postId}`);

//         // const keys = await redisClient.keys("posts:*");
//         // if (keys.length > 0) {
//         //     await redisClient.del(keys);
//         // }

//         res.status(response.status).json(response.data);

//     } catch (err) {
//         if (err.response) {
//             return res.status(err.response.status).json(err.response.data);
//         }

//         console.error(err.message);
//         res.status(500).json({
//             error: "Delete failed"
//         });
//     }
// });
// // app.listen(PORT, () => {
// //     console.log(`API Gateway running on port ${PORT}`);
// // });

// app.get("/health", (req, res) => {
//     res.send("OK");
// });

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`API Gateway running on port ${PORT}`);
// });

import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();
app.use(express.json());

// ================= LOGGER =================
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// ================= RATE LIMIT =================
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

// ================= ENV =================
const USER_SERVICE = process.env.USER_SERVICE_URL;
const POST_SERVICE = process.env.POST_SERVICE_URL;
const COMMENT_SERVICE = process.env.COMMENT_SERVICE_URL;

// ================= AXIOS INSTANCE =================
const api = axios.create({
    timeout: 4000
});

// ================= RETRY WRAPPER =================
const requestWithRetry = async (fn, retries = 1) => {
    try {
        return await fn();
    } catch (err) {
        if (retries > 0) {
            logger.warn("Retrying request...");
            return requestWithRetry(fn, retries - 1);
        }
        throw err;
    }
};

// ================= RESPONSE FORMAT =================
const success = (res, data) => {
    res.json({
        success: true,
        data,
        error: null
    });
};

const failure = (res, err, fallbackMsg = "Internal error") => {
    logger.error(err.message);
    res.status(err.response?.status || 500).json({
        success: false,
        data: null,
        error: err.response?.data?.error || fallbackMsg
    });
};

// ================= ROOT =================
app.get("/", (req, res) => {
    success(res, "API Gateway Running");
});

app.get("/health", (req, res) => {
    success(res, "OK");
});

// ================= USER =================

// SIGNUP
app.post("/signup", async (req, res) => {
    try {
        const response = await requestWithRetry(() =>
            api.post(`${USER_SERVICE}/signup`, req.body)
        );
        success(res, response.data);
    } catch (err) {
        failure(res, err, "Signup failed");
    }
});

// LOGIN
app.post("/login", async (req, res) => {
    try {
        const response = await requestWithRetry(() =>
            api.post(`${USER_SERVICE}/login`, req.body)
        );
        success(res, response.data);
    } catch (err) {
        failure(res, err, "Login failed");
    }
});

// ================= POSTS =================

// CREATE POST
app.post("/posts", async (req, res) => {
    try {
        const response = await requestWithRetry(() =>
            api.post(`${POST_SERVICE}/posts`, req.body, {
                headers: { Authorization: req.headers.authorization }
            })
        );
        success(res, response.data);
    } catch (err) {
        failure(res, err, "Create post failed");
    }
});

// GET POSTS
app.get("/posts", async (req, res) => {
    try {
        const response = await requestWithRetry(() =>
            api.get(`${POST_SERVICE}/posts`)
        );
        success(res, response.data);
    } catch (err) {
        failure(res, err, "Fetch posts failed");
    }
});

// GET POST + COMMENTS (Aggregation)
app.get("/posts/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const [postRes, commentRes] = await Promise.allSettled([
            requestWithRetry(() => api.get(`${POST_SERVICE}/posts/${id}`)),
            requestWithRetry(() => api.get(`${COMMENT_SERVICE}/comments/${id}`))
        ]);

        const post =
            postRes.status === "fulfilled" ? postRes.value.data : null;

        const comments =
            commentRes.status === "fulfilled"
                ? commentRes.value.data
                : [];

        if (!post) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "Post not found"
            });
        }

        success(res, { post, comments });

    } catch (err) {
        failure(res, err, "Aggregation failed");
    }
});

// ================= COMMENTS =================

// CREATE COMMENT
app.post("/comments", async (req, res) => {
    try {
        const response = await requestWithRetry(() =>
            api.post(`${COMMENT_SERVICE}/comments`, req.body, {
                headers: { Authorization: req.headers.authorization }
            })
        );
        success(res, response.data);
    } catch (err) {
        failure(res, err, "Create comment failed");
    }
});

// GET COMMENTS
app.get("/comments/:id", async (req, res) => {
    try {
        const response = await requestWithRetry(() =>
            api.get(`${COMMENT_SERVICE}/comments/${req.params.id}`)
        );
        success(res, response.data);
    } catch (err) {
        failure(res, err, "Fetch comments failed");
    }
});

// DELETE COMMENT
app.delete("/comments/:id", async (req, res) => {
    try {
        const response = await requestWithRetry(() =>
            api.delete(`${COMMENT_SERVICE}/comments/${req.params.id}`, {
                headers: { Authorization: req.headers.authorization }
            })
        );
        success(res, response.data);
    } catch (err) {
        failure(res, err, "Delete failed");
    }
});

// ================= START =================
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    logger.info(`Gateway running on port ${PORT}`);
});