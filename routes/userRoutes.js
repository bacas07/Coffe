import express from "express";
import userController from "../controllers/userController.js";
import { verifyToken, permit } from "../utils/auth.js"

const userRoutes = express.Router();

userRoutes.post('/register', verifyApiKey, (req, res) => userController.register(req, res));

userRoutes.post('/login', verifyApiKey, (req, res) => userController.login(req, res));

userRoutes.delete('/:id', verifyApiKey, verifyToken, permit('admin'), (req, res) => userController.deleteById(req, res));

export default userRoutes;