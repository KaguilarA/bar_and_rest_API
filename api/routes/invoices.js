import express from 'express';
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
router.get('/', getAllInvoices);

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
router.post('/', createInvoice);

/**
 * @route POST /invoices/state
 * @description Get invoices by state
 * @access Public
 */
router.post('/state', getInvoiceByState);

/**
 * @route PUT /invoices/:id/state
 * @description Update the state of an invoice
 * @access Public
 */
router.put('/:id/state', updateInvoiceState);

/**
 * @route PUT /invoices/:id/quantity
 * @description Update the quantity of a product in an invoice
 * @access Public
 */
router.put('/:id/quantity', updateInvoiceQuantity);

export default router;