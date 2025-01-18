import express from 'express';
import { validateAuthUser } from '../../middlewares/auth.js';
import ProductController from '../controllers/products.js';

export default (productModel) => {
  const productController = new ProductController(productModel);
  const router = express.Router();

  /**
   * @route GET /products
   * @description Get all products
   * @access Public
   */
  router.get('/', productController.getAllProducts);

  /**
   * @route GET /products/:id
   * @description Get a product by ID
   * @access Public
   */
  router.get('/:id', productController.getProductById);

  /**
   * @route POST /products
   * @description Create a new product
   * @access Public
   */
  router.post('/', [validateAuthUser], productController.createProduct);

  /**
   * @route POST /products/type
   * @description Get products by type
   * @access Public
   */
  router.post('/type', productController.getProductByType);

  /**
   * @route PATCH /products/stock
   * @description Update the stock of a product
   * @access Public
   */
  router.patch('/stock', [validateAuthUser], productController.updateProductStock);

  /**
   * @route PATCH /products/:id
   * @description Activate a product
   * @access Public
   */
  router.patch('/:id', [validateAuthUser], productController.activateProduct);

  /**
   * @route PUT /products
   * @description Update a product
   * @access Public
   */
  router.put('/', [validateAuthUser], productController.updateProduct);

  /**
   * @route DELETE /products/:id
   * @description Disable a product
   * @access Public
   */
  router.delete('/:id', [validateAuthUser], productController.disableProduct);

  return router;
}