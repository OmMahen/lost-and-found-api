import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}).promise();

const getLostItems = async () => {
  const [rows] = await pool.query('SELECT * FROM lost_item');
  return rows;
};

const getLostItem = async (id) => {
  const [rows] = await pool.query('SELECT * FROM lost_item WHERE idlost_item = ?', [id]);
  return rows[0];
};

const createLostItem = async (userName) => {
  const [result] = await pool.query(`
  INSERT INTO lost_item (user_name)
  VALUE (?)
  `, [userName]);
  const id = result.insertId;
  return getLostItem(id);
};

export { getLostItems, createLostItem, getLostItem };
