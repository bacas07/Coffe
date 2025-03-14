import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/connectDB.js';
import middleware from './config/middleware.js';
import coffeRoutes from './routes/coffeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { verifyApiKey } from './utils/auth.js';

const app = express();

middleware(app);

app.use(bodyParser.json());

connectDB();

app.get('/', verifyApiKey, (req, res) => {
    res.send('Hello  World :)');
})
app.use('/coffes', coffeRoutes);
app.use('/users', userRoutes);

try {
    const PORT = process.env.PORT || 5000;
    app.listen( PORT, () => {
        console.log('-> Server running on port', PORT);
    } )
} catch (e) {
    console.error(e);
}