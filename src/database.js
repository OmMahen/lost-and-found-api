import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgres://OmMahen:Ik7g1UWtOYlC@ep-sweet-glitter-836224-pooler.ap-southeast-1.aws.neon.tech/lostandfound_db",
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require',
  },
});

const getLostItems = async () => {
  const { rows } = await pool.query('SELECT * FROM lost_items');
  return rows;
};

const getFoundItems = async () => {
  const { rows } = await pool.query('SELECT * FROM found_items');
  return rows;
};

const getAllItems = async () => {
  const { rows } = await pool.query('SELECT * FROM items');
  return rows;
};

const getLostItem = async (id) => {
  const { rows } = await pool.query('SELECT * FROM lost_items WHERE id = $1', [id]);
  return rows[0];
};

const getFoundItem = async (id) => {
  const { rows } = await pool.query('SELECT * FROM found_items WHERE id = $1', [id]);
  return rows[0];
};

const getItemById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return rows[0];
};

const createLostItem = async (userData) => {
  const { user_name, user_email, user_phone, item_name, item_description, loss_date, loss_location, iditem_image } = userData;
  const { rows } = await pool.query(`
    INSERT INTO lost_items (user_name, user_email, user_phone, item_name, item_description, loss_date, loss_location, iditem_image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
  `, [user_name, user_email, user_phone, item_name, item_description, loss_date, loss_location, iditem_image]);
  const id = rows[0].id;
  return getLostItem(id);
};

const createFoundItem = async (userData) => {
  const { user_name, user_email, user_phone, item_name, item_description, found_date, found_location, iditem_image } = userData;
  const { rows } = await pool.query(`
    INSERT INTO found_items (user_name, user_email, user_phone, item_name, item_description, found_date, found_location, iditem_image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
  `, [user_name, user_email, user_phone, item_name, item_description, found_date, found_location, iditem_image]);
  const id = rows[0].id;
  return getFoundItem(id);
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

export { getLostItems, createLostItem, getLostItem, insertImage, getFoundItems, getFoundItem, createFoundItem, getAllItems, getItemById, createItem };
