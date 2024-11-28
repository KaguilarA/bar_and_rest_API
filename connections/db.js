import mysql from 'mysql2';

process.loadEnvFile();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default async (procedureName, params = []) => {
  const connection = await pool.promise().getConnection();
  try {
    const [rows, fields] = await connection.execute(`CALL ${procedureName}(?)`, [params]);
    return rows;
  } finally {
    connection.release();
  }
};

