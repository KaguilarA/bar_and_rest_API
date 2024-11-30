import mysql from 'mysql2';

process.loadEnvFile();

const dbConnection = () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  return pool.promise();
}

const createPlaceholders = (params) => {
  if (!params || params.length === 0) {
    return '';
  }

  return params.map(() => '?').join(', ');
}

const validateProcedure = (procedure, params) => {
  if (!params) {
    procedure = `CALL ${procedure}()`;
  } else {
    const paramsPlaceholders = createPlaceholders(params);
    procedure = `CALL ${procedure}(${paramsPlaceholders})`;
  }

  return procedure;
}

export const StoredProcedure = async (procedure, params, parser) => {
  const connection = dbConnection();
  procedure = validateProcedure(procedure, params);

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