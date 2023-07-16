import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgres://mputraraharja:oLQdnxU5gmS1@ep-lively-tooth-750094-pooler.ap-southeast-1.aws.neon.tech/lostandfound_db",
  // connectionString: "postgres://mputraraharja:oLQdnxU5gmS1@ep-lively-tooth-750094-pooler.ap-southeast-1.aws.neon.tech/test_db",
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require',
  },
});

const getAllItems = async () => {
  const { rows } = await pool.query('SELECT iditem_image, item_location, id, item_name, item_date, item_description, status FROM items');
  return rows;
};

const getItemById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return rows[0];
};

const createItem = async (userData) => {
  const { user_name, user_email, user_phone, item_name, item_description, item_date, item_location, status, iditem_image } = userData;
  const { rows } = await pool.query(`
    INSERT INTO items (user_name, user_email, user_phone, item_name, item_description, item_date, item_location, status, iditem_image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id
  `, [user_name, user_email, user_phone, item_name, item_description, item_date, item_location, status, iditem_image]);
  const id = rows[0].id;
  return getItemById(id);
};

const insertImage = async (image) => {
  const { rows } = await pool.query(`
    INSERT INTO item_image (image_data)
    VALUES ($1)
    RETURNING iditem_image
  `, [image]);
  const id = rows[0].iditem_image;
  return id;
};

export { insertImage, getAllItems, getItemById, createItem };
