/**
 * BaseModel class that provides common methods for interacting with the database.
 * Designed to be extended by specific models for CRUD operations using stored procedures.
 */
export default class BaseModel {

  /**
   * Constructor for the BaseModel class.
   * @param {number} id - The ID of the model.
   * @param {Object} state - The state of the model.
   * @param {string} dateCreated - The creation date of the model.
   */
  constructor({ id, name, state, dateCreated }) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (state) this.state = state;
    if (dateCreated) this.dateCreated = new Date(dateCreated);
  }

}