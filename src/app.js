import Express from "express"
import multer from "multer";

import { getLostItem, getLostItems,  createLostItem, insertImage } from "./database.js";
const app = Express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(Express.json());

app.get("/", (req, res) => {
    res.send("Lost and Found Finder API");
});

app.get('/lost-items', async (req, res) => {
    const items = await getLostItems();
    res.send(items);
});

app.get('/lost-items/:id', async (req, res) => {
    const id = req.params.id;
    const item = await getLostItem(id);
    res.send(item);
});

app.post('/lost-items', async (req, res) => {
    const { name } = req.body;
    const item = await createLostItem(name);
    res.status(201).send(item);
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