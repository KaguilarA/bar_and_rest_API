import mysql from "mysql2";

// Load environment variables
process.loadEnvFile();

const {
  DB_HOST: host,
  DB_USER: user,
  DB_PASSWORD: password,
  DB_NAME: database,
  DB_PORT: port = 3306,
} = process.env;

const pool = mysql
  .createPool({ host, user, password, database, port })
  .promise();

// Configure session store
export const sessionStore = new MySQLStore({}, pool);

/**
 * Validates and formats the stored procedure call.
 * Ensures the query matches the required SQL syntax based on the parameters provided.
 *
 * Example:
 * - Procedure: "GetUserById"
 * - Params: [1]
 * - Output: "CALL GetUserById(?)"
 *
 * @param {string} procedure - The name of the stored procedure to execute.
 * @param {Array} params - The parameters to pass into the procedure.
 * @returns {string} The formatted SQL query string.
 */
const validateProcedure = (procedure, params) => {
  const placeholders = params && params.length ? params.map(() => '?').join(', ') : '';
  return `CALL ${procedure}(${placeholders})`;
};

/**
 * Executes a stored procedure.
 *
 * @param {string} procedure - The name of the stored procedure to execute.
 * @param {Array} params - The parameters to pass into the procedure.
 * @param {Function} [parser] - Optional parser function to process the result.
 * @returns {Promise<Array>} The result of the stored procedure.
 */
const executeProcedure = async (procedure, params, parser) => {
  const query = validateProcedure(procedure, params);

  try {
    const [rows] = await pool.query(query, params);
    if (parser) rows[0] = parser(rows[0]);
    return rows;
  } catch (err) {
    console.error('Error while executing stored procedure:', err);
    throw new Error(err.message || 'Database error');
  }
};

export default executeProcedure;
