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

/**
 * @route GET /products
 * @description Get all products
 * @access Public
 */
router.get('/', getAllProducts);

/**
 * @route GET /products/:id
 * @description Get a product by ID
 * @access Public
 */
router.get('/:id', getProductById);

/**
 * @route POST /products
 * @description Create a new product
 * @access Public
 */
router.post('/', createProduct);

/**
 * @route POST /products/type
 * @description Get products by type
 * @access Public
 */
router.post('/type', getProductByType);

/**
 * @route PATCH /products/stock
 * @description Update the stock of a product
 * @access Public
 */
router.patch('/stock', updateProductStock);

/**
 * @route PATCH /products/:id
 * @description Activate a product
 * @access Public
 */
router.patch('/:id', activateProduct);

/**
 * @route PUT /products
 * @description Update a product
 * @access Public
 */
router.put('/', updateProduct);

/**
 * @route DELETE /products/:id
 * @description Disable a product
 * @access Public
 */
router.delete('/:id', disableProduct);

export default router;