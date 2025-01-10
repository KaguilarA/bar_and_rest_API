import express from 'express';
import { validateAuthUser } from '../../middlewares/auth.js';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  getInvoiceByState,
  getInvoiceTotal,
  updateInvoiceState,
  updateInvoiceQuantity
} from '../controllers/invoices.js';

const router = express.Router();

/**
 * @route GET /invoices
 * @description Get all invoices
 * @access Public
 */
router.get('/', [validateAuthUser], getAllInvoices);

/**
 * @route GET /invoices/:id
 * @description Get an invoice by ID
 * @access Public
 */
router.get('/:id', getInvoiceById);

/**
 * @route GET /invoices/:id/total
 * @description Get the total amount of an invoice
 * @access Public
 */
router.get('/:id/total', getInvoiceTotal);

/**
 * @route POST /invoices
 * @description Create a new invoice
 * @access Public
 */
router.post('/', [validateAuthUser], createInvoice);

/**
 * @route POST /invoices/state
 * @description Get invoices by state
 * @access Public
 */
router.post('/state', [validateAuthUser], getInvoiceByState);

/**
 * @route PUT /invoices/:id/state
 * @description Update the state of an invoice
 * @access Public
 */
router.put('/:id/state', [validateAuthUser], updateInvoiceState);

/**
 * @route PUT /invoices/:id/quantity
 * @description Update the quantity of a product in an invoice
 * @access Public
 */
router.put('/:id/quantity', [validateAuthUser], updateInvoiceQuantity);

export default router;