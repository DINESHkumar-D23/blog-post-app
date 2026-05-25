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
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
  database: "blog_db",
  password: process.env.DB_PASSWORD,
  port: 5432,
});
export default pool;