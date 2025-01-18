import express from 'express';

import ProductModel from './models/products.js';
import UserModel from './models/users.js';
import InvoiceModel from './models/invoices.js';

import UserRoutes from './routes/users.js';
import ProductRoutes from './routes/products.js';
import InvoiceRoutes from './routes/invoices.js';

const router = express.Router();

/**
 * @route /users
 * @description Routes for user-related operations
 */
router.use('/users', UserRoutes(UserModel));

/**
 * @route /products
 * @description Routes for product-related operations
 */
router.use('/products', ProductRoutes(ProductModel));

/**
 * @route /invoices
 * @description Routes for invoice-related operations
 */
router.use('/invoices', InvoiceRoutes(InvoiceModel));

export default router;