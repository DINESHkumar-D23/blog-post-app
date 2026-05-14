// // config/db.js

// import pkg from "pg";
// const { Client } = pkg;

// const client = new Client({
//     user: "postgres",
//     host: "postgres",              // ⚠️ Docker uses service name
//     database: "blog_db",
//     password: process.env.DB_PASSWORD,
//     port: 5432,
// });

// // connect function
// export const connectDB = async () => {
//     try {
//         await client.connect();
//         console.log("Post Service DB Connected");
//     } catch (err) {
//         console.error("DB Connection Error:", err);
//     }
// };

// // export client for queries
// export default client;
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