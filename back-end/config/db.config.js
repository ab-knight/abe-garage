import "dotenv/config";
import mysql from "mysql2/promise";
import fs from "fs";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,

  ssl: {
    ca: process.env.DB_CA_BASE64
      ? Buffer.from(process.env.DB_CA_BASE64, 'base64')
      : fs.readFileSync(process.env.DB_CA_PATH),
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql, params) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

export default pool;
