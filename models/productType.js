import BaseModel from "../utils/baseModel.js";

// Stored procedures for the product type model.
const proceduresIds = {
  getAll: "GetAllProductTypes",
  getById: "GetProductTypeById",
  getByName: "GetProductTypeByName",
  register: "CreateProductType",
  update: "UpdateProductTypeById",
};

/**
 * ProductTypeModelMySQL class that provides methods for interacting with the product type entity in the database.
 * This model extends BaseModel and uses its utilities to call stored procedures.
 * @extends BaseModel
 */
export default class ProductTypeModelMySQL extends BaseModel {
  has_stock = false;

  /**
   * Constructor for the ProductTypeModelMySQL class.
   * @param {Object} params - The parameters for the model.
   * @param {number} params.id - The ID of the product type.
   * @param {string} params.name - The name of the product type.
   * @param {boolean} params.has_stock - Indicates if the product type has stock.
   */
  constructor({ id, name, has_stock }) {
    super({ id, name });
    if (has_stock) this.has_stock = Boolean(has_stock);
  }

  /**
   * Gets the parameters for registering a new product type.
   * @returns {Array} The parameters for the register procedure.
   */
  get registerParams() {
    return [this.name, this.has_stock];
  }

  /**
   * Gets the parameters for updating a product type.
   * @returns {Array} The parameters for the update procedure.
   */
  get updateParams() {
    return [this.id, this.name, this.has_stock];
  }

  /**
   * Parses an array of product data and returns an array of ProductTypeModelMySQL instances.
   * @param {Array<Object>} data - The array of product data to parse.
   * @returns {Array<ProductTypeModelMySQL>} An array of ProductTypeModelMySQL instances.
   */
  static parseData(data) {
    return Array.from(data, (value) => new ProductTypeModelMySQL(value));
  }

  /**
   * Retrieves all product types from the database.
   * @returns {Promise<Array<ProductTypeModelMySQL>>} A promise that resolves to an array of ProductTypeModelMySQL instances.
   * @throws {Error} If there is an error while fetching product types.
   */
  static async getAll() {
    try {
      const [rows] = await ProductTypeModelMySQL.executeProcedure(
        proceduresIds.getAll,
        null,
        ProductTypeModelMySQL.parseData
      );

      return rows;
    } catch (err) {
      console.error(err);
      throw new Error("Error while fetching product types");
    }
  }

  /**
   * Retrieves a product type by name from the database.
   * @param {string} name - The name of the product type.
   * @returns {Promise<Array<ProductTypeModelMySQL>>} A promise that resolves to an array of ProductTypeModelMySQL instances.
   * @throws {Error} If there is an error while fetching the product type by name.
   */
  static async getByName(name) {
    try {
      const [rows] = await ProductTypeModelMySQL.executeProcedure(
        proceduresIds.getByName,
        [name],
        ProductTypeModelMySQL.parseData
      );

      return rows;
    } catch (err) {
      console.error(err);
      throw new Error("Error while fetching product type by name");
    }
  }

  /**
   * Retrieves a product type by ID from the database.
   * @param {number} id - The ID of the product type.
   * @returns {Promise<ProductTypeModelMySQL>} A promise that resolves to a ProductTypeModelMySQL instance.
   * @throws {Error} If there is an error while fetching the product type by ID.
   */
  static async getById(id) {
    try {
      const [rows] = await ProductTypeModelMySQL.executeProcedure(
        proceduresIds.getById,
        [id]
      );

      return rows;
    } catch (err) {
      console.error(err);
      throw new Error("Error while fetching product type by ID");
    }
  }

  /**
   * Registers a new product type in the database.
   * @param {Object} data - The data for the new product type.
   * @returns {Promise<Object>} A promise that resolves to the result of the register procedure.
   * @throws {Error} If there is an error while registering the product type.
   */
  static async register(data) {
    try {
      const { registerParams } = new ProductTypeModelMySQL(data);
      const [rows] = await ProductTypeModelMySQL.executeProcedure(
        proceduresIds.register,
        registerParams
      );

      return rows;
    } catch (err) {
      console.error(err);
      throw new Error("Error while registering product type");
    }
  }
}
