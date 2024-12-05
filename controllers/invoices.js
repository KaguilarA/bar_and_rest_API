import InvoiceModel from './../models/invoices.js';

/**
 * Create a new invoice.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const createInvoice = async (req, res) => {
  try {
    const { name, productId, quantity } = req.body;
    const newInvoice = await InvoiceModel.register(name, productId, quantity);
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Get all invoices.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceModel.getAll();
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Get an invoice by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await InvoiceModel.getById(id);
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Get an invoice by state.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getInvoiceByState = async (req, res) => {
  try {
    const { state } = req.body;
    const invoices = await InvoiceModel.getByState(state);
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Get the total amount of an invoice.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getInvoiceTotal = async (req, res) => {
  try {
    const { id } = req.params;
    const total = await InvoiceModel.getTotal(id);
    res.status(200).json(total);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Update the state of an invoice.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const updateInvoiceState = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
    const updatedInvoice = await InvoiceModel.updateState(id, state);
    res.status(200).json(updatedInvoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Update the quantity of a product in an invoice.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const updateInvoiceQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body;
    const updatedInvoice = await InvoiceModel.updateQuantity(id, productId, quantity);
    res.status(200).json(updatedInvoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}