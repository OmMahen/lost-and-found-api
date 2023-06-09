import Express from "express";
import multer from "multer";
import cors from "cors";

import { insertImage, getAllItems, getItemById, createItem} from "./database.js";
const app = Express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(Express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Lost and Found Finder API");
});

app.get('/items', async (req, res) => {
    const items = await getAllItems();
    res.send(items);
});

app.get('/items/:id', async (req, res) => {
    const id = req.params.id;
    const item = await getItemById(id);
    res.send(item);
});

app.post('/items', async (req, res) => {
    const {
        user_name,
        user_email,
        user_phone,
        item_name,
        item_description,
        item_date,
        item_location,
        status,
        iditem_image
    } = req.body;
    
    const userData = {
        user_name,
        user_email,
        user_phone,
        item_name,
        item_description,
        item_date: new Date(item_date),
        item_location,
        status,
        iditem_image
    };

    const item = await createItem(userData);
    res.send(item);
});

app.post('/upload', upload.single('image'), async (req, res) => {
    const imageFile = req.file.buffer;
    const imageId = await insertImage(imageFile);
    res.json({ message: 'Image uploaded successfully', imageId: imageId });
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

export default app;