import express from "express";
import userController from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post('/register', (req, res) => userController.register(req, res));

userRoutes.post('/login', (req, res) => userController.login(req, res));

export default userRoutes;