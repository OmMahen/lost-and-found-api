import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgres://OmMahen:Ik7g1UWtOYlC@ep-sweet-glitter-836224-pooler.ap-southeast-1.aws.neon.tech/test_db",
});

const getLostItems = async () => {
  const { rows } = await pool.query('SELECT * FROM lost_item');
  return rows;
};

const getLostItem = async (id) => {
  const { rows } = await pool.query('SELECT * FROM lost_item WHERE idlost_item = $1', [id]);
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
