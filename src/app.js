import Express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { insertImage, getAllItems, getItemById, createItem} from "./database.js";
const app = Express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(Express.json());
app.use(cors());
app.use(Express.static("docs"));

app.get("/", (req, res) => {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirPath = dirname(currentFilePath);
    const indexPath = path.join(currentDirPath, "index.html");
    res.sendFile(indexPath);
});

app.get('/items', async (req, res) => {
    const items = await getAllItems();
    res.status(200).send(items);
});

app.get('/items/:id', async (req, res) => {
    const id = req.params.id;
    const item = await getItemById(id);
    res.status(200).send(item);
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
    res.status(201).send(item);
});

app.post('/upload', upload.single('image'), async (req, res) => {
    const imageFile = req.file.buffer;
    const imageId = await insertImage(imageFile);
    res.status(201).json({ message: 'Image uploaded successfully', imageId: imageId });
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

export default app;