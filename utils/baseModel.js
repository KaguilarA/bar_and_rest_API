import mysql from 'mysql2';

// Load environment variables
process.loadEnvFile();

/**
 * BaseModel class that provides common methods for interacting with the database.
 */
export class BaseModel {
  /**
   * Constructor for the BaseModel class.
   * @param {number} id - The ID of the model.
   * @param {boolean} state - The state of the model.
   * @param {string} date_created - The creation date of the model.
   */
  constructor(id, state, date_created) {
    if (id) this.id = id;
    if (state) this.state = state;
    this.setDateCreated(date_created);
  }

  /**
   * Sets the creation date of the model.
   * @param {string} date - The creation date in string format.
   */
  setDateCreated(date) {
    if (date) this.dateCreated = new Date(date);
  }

  /**
   * Creates a pool connection to the database.
   * @returns {Promise} - A promise that resolves with the pool connection.
   */
  static #connect() {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    return pool.promise();
  }

  /**
   * Creates placeholders for the query parameters.
   * @param {Array} params The query parameters.
   * @returns {string} A string of placeholders.
   */
  static #createPlaceholders(params) {
    let placeholders = '';
    if (!params || params.length === 0) {
      placeholders = '';
    } else {
      placeholders = params.map(() => '?').join(', ');
    }

    return placeholders;
  }

  /**
   * Validates and formats the stored procedure.
   * @param {string} procedure The name of the stored procedure.
   * @param {Array} params The parameters of the stored procedure.
   * @returns {string} The formatted stored procedure query.
   */
  static #validateProcedure(procedure, params) {
    if (!params) {
      return `CALL ${procedure}()`;
    } else {
      const paramsPlaceholders = BaseModel.#createPlaceholders(params);
      return `CALL ${procedure}(${paramsPlaceholders})`;
    }
  }

  /**
   * Executes a stored procedure.
   * @param {string} procedure The name of the stored procedure.
   * @param {Array} params The parameters of the stored procedure.
   * @param {Function} parser An optional function to parse the results.
   * @returns {Promise} A promise that resolves with the query results.
   */
  static async storedProcedure(procedure, params, parser) {
    const connection = BaseModel.#connect();
    procedure = BaseModel.#validateProcedure(procedure, params);

    try {
      const [rows] = await connection.query(procedure, params);

      if (parser) {
        rows[0] = parser(rows[0]);
      }

      return rows;
    } catch (err) {
      console.error('Error while executing stored procedure:', err);
      throw new Error('Error while executing stored procedure');
    } finally {
      connection.end();
    }
  }
}