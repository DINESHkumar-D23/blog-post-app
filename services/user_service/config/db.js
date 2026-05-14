// import express from "express";

// const app = express();

// // simple test route
// app.get("/health", (req, res) => {
//     res.send("OK");
// });

// // VERY IMPORTANT
// const PORT = process.env.PORT || 8080;

// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Server running on ${PORT}`);
// });
import pkg from "pg";
const { Client } = pkg;

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
});
export const connectDB = async () => {
    try {
        await client.connect();
        console.log("DB Connected");
    } catch (err) {
        console.error("DB Error:", err);
    }
};

export default client;