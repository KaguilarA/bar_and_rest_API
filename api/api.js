import express from 'express';

import ProductModelMySQL from './models/product-mysql.js';
import ProductTypeModelMySQL from './models/productType-mysql.js';
import UserModelMySQL from './models/user-mysql.js';
import InvoiceModelMySQL from './models/invoice-mysql.js';

import UserRoutes from './routes/users.js';
import ProductRoutes from './routes/products.js';
import InvoiceRoutes from './routes/invoices.js';

const router = express.Router();

/**
 * @route /users
 * @description Routes for user-related operations
 */
router.use('/users', UserRoutes(UserModelMySQL));

/**
 * @route /products
 * @description Routes for product-related operations
 */
router.use('/products', ProductRoutes(ProductModelMySQL));

/**
 * @route /invoices
 * @description Routes for invoice-related operations
 */
router.use('/invoices', InvoiceRoutes(InvoiceModelMySQL));

export default router;