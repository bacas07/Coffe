import express from "express";
import userController from "../controllers/userController.js";
import { verifyToken, permit } from "../utils/auth.js"

const userRoutes = express.Router();

userRoutes.post('/register', (req, res) => userController.register(req, res));

userRoutes.post('/login', (req, res) => userController.login(req, res));

userRoutes.delete('/:id', verifyToken, permit('admin'), (req, res) => userController.deleteById(req, res));

export default userRoutes;