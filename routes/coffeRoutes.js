import express from 'express';
import coffeeController from '../controllers/coffeController.js';
import { verifyToken, permit } from '../utils/auth.js';

const coffeeRoutes = express.Router();

coffeeRoutes.get('/', /* verifyToken, permit('user', 'admin'),*/ (req, res) => coffeeController.findAll(req, res));
coffeeRoutes.get('/:id', verifyToken, permit('user', 'admin'), (req, res) => coffeeController.findById(req, res));

coffeeRoutes.post('/', verifyToken, permit('admin'), (req, res) => coffeeController.create(req, res));
coffeeRoutes.put('/:id', verifyToken, permit('admin'), (req, res) => coffeeController.updateById(req, res));
coffeeRoutes.delete('/:id', verifyToken, permit('admin'), (req, res) => coffeeController.deleteById(req, res));

export default coffeeRoutes;
