import express from 'express';
import { getAllProducts, createProduct } from '../controllers/products.js';

const router = express.Router();

router.get('/', getAllProducts);

router.post('/', createProduct);

export default router;