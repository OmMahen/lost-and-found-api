import Express from "express"
import multer from "multer";

import { getLostItem, getLostItems,  createLostItem } from "./database.js";
const app = Express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

app.use(Express.json());
app.use('/uploads', Express.static('uploads'));

app.get("/", (req, res) => {
    res.send("Express on Vercel");
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

app.post('/upload', upload.single('image'), (req, res) => {
    const imageFile = req.file;
    res.json({ message: 'Image uploaded successfully' });
  });

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

export default app;