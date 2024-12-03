import express from 'express';
import {
  activateProduct,
  createProduct,
  disableProduct,
  getAllProducts,
  getProductById,
  getProductByType,
  updateProduct,
  updateProductStock,
} from '../controllers/products.js';

const router = express.Router();

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', createProduct);

router.post('/type', getProductByType);

router.patch('/stock', updateProductStock);

router.patch('/:id', activateProduct);

router.put('/', updateProduct);

router.delete('/:id', disableProduct);

export default router;