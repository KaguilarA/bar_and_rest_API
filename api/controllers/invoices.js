import BaseController from "../../utils/baseController.js";

export default class InvoiceController extends BaseController {
  /**
   * Create a new invoice.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  createInvoice = async (req, res) => {
    try {
      const { name, productId, quantity } = req.body;
      const newInvoice = await this.model.register(name, productId, quantity);
      res.status(201).json(newInvoice);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  /**
   * Get all invoices.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getAllInvoices = async (req, res) => {
    try {
      const invoices = await this.model.getAll();
      res.status(200).json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  /**
   * Get an invoice by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getInvoiceById = async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await this.model.getById(id);
      res.status(200).json(invoice);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  /**
   * Get an invoice by state.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getInvoiceByState = async (req, res) => {
    try {
      const { state } = req.body;
      const invoices = await this.model.getByState(state);
      res.status(200).json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  /**
   * Get the total amount of an invoice.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getInvoiceTotal = async (req, res) => {
    try {
      const { id } = req.params;
      const total = await this.model.getTotal(id);
      res.status(200).json(total);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  /**
   * Update the state of an invoice.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  updateInvoiceState = async (req, res) => {
    try {
      const { id } = req.params;
      const { state } = req.body;
      const updatedInvoice = await this.model.updateState(id, state);
      res.status(200).json(updatedInvoice);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  /**
   * Update the quantity of a product in an invoice.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  updateInvoiceQuantity = async (req, res) => {
    try {
      const { id } = req.params;
      const { productId, quantity } = req.body;
      const updatedInvoice = await this.model.updateQuantity(
        id,
        productId,
        quantity
      );
      res.status(200).json(updatedInvoice);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
