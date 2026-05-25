// import pkg from "pg";
// const { Client } = pkg;

// const client = new Client({
//     host: "postgres",   // IMPORTANT for Docker
//     user: "postgres",
//     password: process.env.DB_PASSWORD,
//     database: "blog_db",
//     port: 5432
// });

// export const connectDB = async () => {
//     try {
//         await client.connect();
//         console.log("Comment DB Connected");
//     } catch (err) {
//         console.error("DB Error:", err);
//     }
// };

// export default client;
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