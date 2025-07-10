import { executeProcedure } from "./../db/db.js";

/**
 * BaseModel class that provides common methods for interacting with the database.
 * Designed to be extended by specific models for CRUD operations using stored procedures.
 */
export default class BaseModel {

  /**
   * Executes a stored procedure.
   * @param {string} procedure - The name of the stored procedure to execute.
   * @param {Array} params - The parameters to pass into the procedure.
   * @param {Function} [parser] - Optional parser function to process the result.
   * @returns {Promise<Array>} The result of the stored procedure.
   */
  static executeProcedure = executeProcedure;

  /**
   * Constructor for the BaseModel class.
   * @param {Object} params - The parameters for the model.
   * @param {number} params.id - The ID of the model.
   * @param {string} params.name - The name of the model.
   * @param {string} params.description - The description of the model.
   * @param {string} params.state - The state of the model.
   * @param {string} params.dateCreated - The creation date of the model.
   */
  constructor({ id, name, description, images, state, date_created, date_updated }) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (description) this.description = description;
    if (images) this.images = images;
    if (state) this.state = state;
    if (date_created) this.date_created = new Date(date_created);
    if (date_updated) this.date_created = new Date(date_updated);
  }

}