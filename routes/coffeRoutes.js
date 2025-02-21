import express from 'express';
import coffeeController from '../controllers/coffeController.js';
import { verifyToken, permit, verifyApiKey } from '../utils/auth.js';

const coffeeRoutes = express.Router();

coffeeRoutes.get('/', verifyApiKey, /* verifyToken, permit('user', 'admin'),*/ (req, res) => coffeeController.findAll(req, res));
coffeeRoutes.get('/:id', verifyApiKey, /* verifyToken, permit('user', 'admin'),*/ (req, res) => coffeeController.findById(req, res));

coffeeRoutes.post('/', verifyApiKey, verifyToken, permit('admin'), (req, res) => coffeeController.create(req, res));
coffeeRoutes.put('/:id', verifyApiKey, verifyToken, permit('admin'), (req, res) => coffeeController.updateById(req, res));
coffeeRoutes.delete('/:id', verifyApiKey, verifyToken, permit('admin'), (req, res) => coffeeController.deleteById(req, res));

export default coffeeRoutes;
