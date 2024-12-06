import express from 'express';

import UsersRoutes from './routes/users.js';
import ProductsRoutes from './routes/products.js';
import InvoicesRoutes from './routes/invoices.js';

const router = express.Router();

/**
 * @route /users
 * @description Routes for user-related operations
 */
router.use('/users', UsersRoutes);

/**
 * @route /products
 * @description Routes for product-related operations
 */
router.use('/products', ProductsRoutes);

/**
 * @route /invoices
 * @description Routes for invoice-related operations
 */
router.use('/invoices', InvoicesRoutes);

export default router;