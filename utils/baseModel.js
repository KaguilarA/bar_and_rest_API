import mysql from 'mysql2';

process.loadEnvFile();

export class BaseModel {

  constructor(id, state, date_created) {
    if (id) this.id = id;
    if (state) this.state = state;
    if (date_created) this.dateCreated = Date(date_created);
  }

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

  static #createPlaceholders(params) {
    if (!params || params.length === 0) {
      return '';
    }
  
    return params.map(() => '?').join(', ');
  }

  static #validateProcedure(procedure, params) {
    if (!params) {
      procedure = `CALL ${procedure}()`;
    } else {
      const paramsPlaceholders = BaseModel.#createPlaceholders(params);
      procedure = `CALL ${procedure}(${paramsPlaceholders})`;
    }
  
    return procedure;
  }

  static async storedProcedure(procedure, params, parser) {
    const connection = BaseModel.#connect();
    procedure = BaseModel.#validateProcedure(procedure, params);
  
    try {
      const [rows] = await connection.query(procedure, params);
  
      if (parser) rows[0] = parser(rows[0]);
  
      return rows;
    } catch (err) {
      console.error(err);
      return new Error('Error while executing stored procedure', err);
    } finally {
      connection.end();
    }
  }
}