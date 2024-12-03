import mysql from 'mysql2';

// Load environment variables
process.loadEnvFile();

/**
 * BaseModel class that provides common methods for interacting with the database.
 * Designed to be extended by specific models for CRUD operations using stored procedures.
 */
export class BaseModel {
  static #pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  }).promise();

  /**
   * Constructor for the BaseModel class.
   * @param {number} id The ID of the model.
   * @param {boolean} state The state of the model.
   * @param {string} date_created The creation date of the model.
   */
  constructor(id, state, dateCreated) {
    if (id) this.id = id;
    this.setState(state);
    this.setDateCreated(dateCreated);
  }

  /**
   * Sets the creation date of the model.
   * @param {string} date The creation date in string format.
   */
  setDateCreated(date) {
    if (date) this.dateCreated = new Date(date);
  }

  /**
   * Sets the state of the model.
   * @param {number} state The state in number format.
   */
  setState(state) {
    if (state !== undefined || state !== null) this.state = !!state;
  }

  /**
   * Validates and formats the stored procedure call.
   * Ensures the query matches the required SQL syntax based on the parameters provided.
   * 
   * Example:
   * - Procedure: "GetUserById"
   * - Params: [1]
   * - Output: "CALL GetUserById(?)"
   *
   * @param {string} procedure The name of the stored procedure to execute.
   * @param {Array} params The parameters to pass into the procedure.
   * @returns {string} The formatted SQL query string.
   */
  static #validateProcedure(procedure, params) {
    if (!params) {
      return `CALL ${procedure}()`;
    } else {
      let placeholders = '';

      if (!params || params.length === 0) {
        placeholders = '';
      } else placeholders = params.map(() => '?').join(', ');

      return `CALL ${procedure}(${placeholders})`;
    }
  }

  /**
   * Executes a stored procedure in the database.
   * Optionally applies a parser function to transform the results before returning them.
   *
   * Example:
   * - Procedure: "GetAllUsers"
   * - Params: null
   * - Parser: `(users) => Array.from(users, (user) => new UserModel(user))`
   * 
   * Parser Details:
   * - The parser is a function that processes the raw rows returned from the database.
   * - It is particularly useful for converting database rows into objects of the extending model.
   *
   * @param {string} procedure The name of the stored procedure to execute.
   * @param {Array|null} params The parameters to pass to the procedure. Use `null` for no parameters.
   * @param {Function} [parser] Optional function to process and transform query results.
   * @returns {Promise<Array|Object>} The query results, transformed if a parser is provided.
   * @throws Will throw an error if the query execution fails.
   */
  static async storedProcedure(procedure, params, parser) {
    const query = BaseModel.#validateProcedure(procedure, params);
  
    try {
      const [rows] = await BaseModel.#pool.query(query, params);
      if (parser) rows[0] = parser(rows[0]);
      return rows;
    } catch (err) {
      console.error('Error while executing stored procedure:', err);
      throw new Error(err.message || 'Database error');
    }
  }
}