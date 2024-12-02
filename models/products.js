import { BaseModel } from './../utils/baseModel.js';

// Stored procedures for the product model.
const proceduresIds = {
  getAll: 'GetAllProducts',
  getById: 'GetProductById',
  getByType: 'GetProductsByType',
  register: 'CreateProduct',
  update: 'UpdateProduct',
  updateState: 'UpdateProductState',
  updateStock: 'UpdateProductStock'
}

/**
 * ProductModel class that provides common methods for interacting with the products entity.
 * @extends BaseModel
 */
export default class ProductModel extends BaseModel {
  /**
   * Constructor for the ProductModel class.
   * @param {Object} productData The product data.
   * @param {string} productData.name The name of the product.
   * @param {string} productData.type The type of the product.
   * @param {string} productData.imageUrl The image URL of the product.
   * @param {number} productData.stock - The stock of the product.
   * @param {number} productData.price - The price of the product.
   * @param {string} [productData.state] The state of the product.
   * @param {number} [productData.id] The ID of the product.
   * @param {string} [productData.dateCreated] The creation date of the product.
   * @param {string} [productData.date_created] The creation date of the product.
   */
  constructor({ name, type, imageUrl, stock, price, state, id, dateCreated, date_created }) {
    super(id, state, (date_created || dateCreated));
    this.name = name;
    this.type = type;
    this.imageUrl = imageUrl;
    this.stock = +stock;
    this.price = +price;
  }

  /**
   * Gets the registration parameters.
   * @returns {string[]} The registration parameters.
   */
  get registerParams() {
    return [this.name, this.type, this.imageUrl, this.stock, this.price];
  }

  /**
   * Gets the update parameters.
   * @returns {string[]} The update parameters.
   */
  get updateParams() {
    return [this.id, this.name, this.type, this.imageUrl, this.stock, this.price];
  }

  /**
   * Gets all products.
   * @returns {Promise<ProductModel[]>} The list of products.
   */
  static async getAll() {
    try {
      const [rows] = await ProductModel.storedProcedure(
        proceduresIds.getAll,
        null,
        products => Array.from(products, product => new ProductModel(product))
      );

      return rows;
    } catch (err) {
      throw new Error('Error while fetching products', err);
    }
  }

  /**
   * Gets a product by ID.
   * @param {number} id The ID of the product.
   * @returns {Promise<ProductModel>} The product data.
   */
  static async getById(id) {
    try {
      const [rows] = await ProductModel.storedProcedure(
        proceduresIds.getById,
        [id],
        products => Array.from(products, product => new ProductModel(product))
      );

      return rows[0];
    } catch (err) {
      throw new Error('Error while fetching product', err);
    }
  }

  /**
   * Gets products by type.
   * @param {string} type The type of the products to fetch.
   * @returns {Promise<ProductModel[]>} The list of products with the specified type.
   */
  static async getByType(type) {
    try {
      const [rows] = await ProductModel.storedProcedure(
        proceduresIds.getByType,
        [type],
        products => Array.from(products, product => new ProductModel(product))
      );

      return rows;
    } catch (err) {
      throw new Error('Error while fetching products by type', err);
    }
  }

  /**
   * Registers a new product.
   * @param {Object} productData The product data.
   * @returns {Promise<Object>} The result of the registration.
   */
  static async register(productData) {
    try {
      const { registerParams } = new ProductModel(productData);
      const { affectedRows } = await ProductModel.storedProcedure(proceduresIds.register, registerParams);

      if (affectedRows === 1) return { saved: true };
    } catch (err) {
      throw new Error('Error while creating product', err);
    }
  }

  /**
   * Updates a product.
   * @param {Object} productData The product data.
   * @returns {Promise<Object>} The result of the update.
   */
  static async update(productData) {
    try {
      const { updateParams } = new ProductModel(productData);
      const { affectedRows } = await ProductModel.storedProcedure(
        proceduresIds.update,
        updateParams
      );

      if (affectedRows === 1) return { updated: true };
    } catch (err) {
      throw new Error('Error while updating product', err);
    }
  }

  /**
   * Updates the state of a product.
   * @param {number} productId The ID of the product.
   * @param {boolean} state The new state of the product.
   * @returns {Promise<Object>} The result of the state update.
   */
  static async updateState(productId, state) {
    try {
      const { affectedRows } = await ProductModel.storedProcedure(
        proceduresIds.updateState,
        [productId, state]
      );

      if (affectedRows === 1) return { productState: state };
    } catch (err) {
      throw new Error('Error while updating product state', err);
    }
  }

  /**
   * Updates the stock of a product.
   * @param {number} productId The ID of the product.
   * @param {number} stock The new stock of the product.
   * @returns {Promise<Object>} The result of the stock update.
   */
  static async updateStock(productId, stock) {
    try {
      const { affectedRows } = await ProductModel.storedProcedure(
        proceduresIds.updateStock,
        [productId, stock]
      );

      if (affectedRows === 1) return { stockUpdated: true };
    } catch (err) {
      throw new Error('Error while updating product stock', err);
    }
  }
}