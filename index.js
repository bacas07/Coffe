import path from "path";
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/connectDB.js';
import middleware from './config/middleware.js';
import userRoutes from './routes/userRoutes.js';
import coffeRoutes from './routes/coffeRoutes.js';
import { verifyApiKey } from './utils/auth.js';

const app = express();

middleware(app);

app.use(bodyParser.json());

connectDB();

const frontendPath = path.resolve("frontend/dist");
app.use(express.static(frontendPath));

app.get("/", verifyApiKey, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

app.use('/coffes', coffeRoutes);
app.use('/users', userRoutes);

try {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log('-> Server running on port', PORT);
    })
} catch (e) {
    console.error(e);
}