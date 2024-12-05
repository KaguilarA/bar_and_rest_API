import { BaseModel } from './../utils/baseModel.js';

// Stored procedures for the invoice model.
const proceduresIds = {
  getAll: 'GetAllInvoices',
  getById: 'GetInvoiceById',
  getByState: 'GetInvoicesByState',
  getTotal: 'GetInvoiceTotal',
  register: 'CreateInvoice',
  updateQuantity: 'UpdateProductQuantityInvoice',
  updateState: 'UpdateInvoiceState',
};

/**
 * Class representing a product in an invoice.
 */
class ProductInvoice {
  /**
   * Create a product invoice.
   * @param {Object} product - The product data.
   * @param {number} product.id - The ID of the product.
   * @param {string} product.name - The name of the product.
   * @param {number} product.quantity - The quantity of the product.
   * @param {number} product.price - The price of the product.
   * @param {number} product.total - The total price of the product.
   */
  constructor({ id, name, quantity, price, total }) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.total = total;
  }
}

/**
 * Class representing an invoice.
 * @extends BaseModel
 */
export default class InvoiceModel extends BaseModel {
  /**
   * Create an invoice.
   * @param {Object} invoiceData The invoice data.
   * @param {string} invoiceData.date_created - The creation date of the invoice.
   * @param {string} invoiceData.name The name of the invoice.
   * @param {string} invoiceData.state The state of the invoice.
   * @param {number} invoiceData.id The ID of the invoice.
   * @param {number} invoiceData.productId The ID of the product.
   * @param {Array} invoiceData.products The products in the invoice.
   * @param {number} invoiceData.quantity The quantity of the product.
   * @param {number} invoiceData.total_amount The total amount of the invoice.
   */
  constructor({ date_created, name, state, id, productId, products, quantity, total_amount }) {
    super(id, undefined, date_created);
    this.name = name;
    if (productId) this.productId = productId;
    if (quantity) this.quantity = quantity;
    if (state) this.state = state;
    if (total_amount !== undefined) this.totalAmount = +total_amount;
    this.parseProducts(products);
  }

  /**
   * Get the registration parameters.
   * @returns {Array} The registration parameters.
   */
  get registerParams() {
    return [this.name, this.productId, this.quantity];
  }

  /**
   * Get the update quantity parameters.
   * @returns {Array} The update quantity parameters.
   */
  get updateQuantityParams() {
    return [this.id, this.productId, this.quantity];
  }

  /**
   * Get the update state parameters.
   * @returns {Array} The update state parameters.
   */
  get updateStateParams() {
    return [this.id, this.state];
  }

  /**
   * Parse the products in the invoice.
   * @param {Array} products The products in the invoice.
   */
  parseProducts(products = []) {
    if (products.length > 0) {
      this.products = Array.from(products, product => new ProductInvoice(product));
    }
  }

  /**
   * Get all invoices.
   * @returns {Promise<Array>} The list of invoices.
   */
  static async getAll() {
    try {
      const [rows] = await InvoiceModel.storedProcedure(
        proceduresIds.getAll,
        null,
        invoices => Array.from(invoices, invoice => new InvoiceModel(invoice))
      );

      return rows;
    } catch (err) {
      throw new Error('Error while fetching invoices', err);
    }
  }

  /**
   * Get an invoice by ID.
   * @param {number} id The ID of the invoice.
   * @returns {Promise<Object>} The invoice data.
   */
  static async getById(id) {
    try {
      const [rows] = await InvoiceModel.storedProcedure(
        proceduresIds.getById,
        [id],
        invoices => Array.from(invoices, invoice => new InvoiceModel(invoice))
      );

      return rows;
    } catch (err) {
      throw new Error('Error while fetching invoices', err);
    }
  }

  /**
   * Get invoices by state.
   * @param {string} state The state of the invoice.
   * @returns {Promise<Array>} The list of invoices.
  */
  static async getByState(state) {
    try {
      const [rows] = await InvoiceModel.storedProcedure(
        proceduresIds.getByState,
        [state],
        invoices => Array.from(invoices, invoice => new InvoiceModel(invoice))
      );

      return rows;
    } catch (err) {
      throw new Error('Error while fetching invoices', err);
    }
  }

  /**
   * Get the total amount of an invoice.
   * @param {number} id The ID of the invoice.
   * @returns {Promise<Object>} The total amount of the invoice.
   */
  static async getTotal(id) {
    try {
      const [rows] = await InvoiceModel.storedProcedure(
        proceduresIds.getTotal,
        [id],
      );

      return rows[0];
    } catch (err) {
      throw new Error('Error while fetching invoice total', err);
    }
  }

  /**
   * Register a new invoice.
   * @param {string} name The name of the invoice.
   * @param {number} productId The ID of the product.
   * @param {number} quantity The quantity of the product.
   * @returns {Promise<Object>} The result of the registration.
   */
  static async register(name, productId, quantity) {
    try {
      const { registerParams } = new InvoiceModel({ name, productId, quantity });
      const { affectedRows } = await InvoiceModel.storedProcedure(
        proceduresIds.register,
        registerParams,
      );

      if (affectedRows === 1) return { saved: true };
    } catch (err) {
      throw new Error('Error while registering invoice', err);
    }
  }

  /**
   * Update the quantity of a product in an invoice.
   * @param {number} id The ID of the invoice.
   * @param {number} productId The ID of the product.
   * @param {number} quantity The new quantity of the product.
   * @returns {Promise<Object>} The result of the update.
   */
  static async updateQuantity(id, productId, quantity) {
    try {
      const { updateQuantityParams } = new InvoiceModel({ id, productId, quantity });
      const { affectedRows } = await InvoiceModel.storedProcedure(
        proceduresIds.updateQuantity,
        updateQuantityParams,
      );

      if (affectedRows === 1) return { quantityUpdated: true };
    } catch (err) {
      throw new Error('Error while updating invoice quantity', err);
    }
  }

  /**
   * Update the state of an invoice.
   * @param {number} id The ID of the invoice.
   * @param {string} state The new state of the invoice.
   * @returns {Promise<Object>} The result of the update.
   */
  static async updateState(id, state) {
    try {
      const { updateStateParams } = new InvoiceModel({ id, state });
      const { affectedRows } = await InvoiceModel.storedProcedure(
        proceduresIds.updateState,
        updateStateParams,
      );
      if (affectedRows === 1) return { invoiceUpdated: true };
    } catch (err) {
      throw new Error('Error while updating invoice state', err);
    }
  }
}