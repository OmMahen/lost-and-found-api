import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgres://default:mdhYe71VMPsH@ep-black-lake-236539-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
});

const getLostItems = async () => {
  const { rows } = await pool.query('SELECT * FROM lost_item');
  return rows;
};

const getLostItem = async (id) => {
  const { rows } = await pool.query('SELECT * FROM lost_item WHERE idlost_item = ?', [id]);
  return rows[0];
};

const createLostItem = async (userName) => {
  const { rows } = await pool.query(`
    INSERT INTO lost_item (user_name)
    VALUES ($1)
    RETURNING idlost_item
  `, [userName]);
  const id = rows[0].idlost_item;
  return getLostItem(id);
};

export { getLostItems, createLostItem, getLostItem };
