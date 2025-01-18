import app from './app.js';

import APIRoutes from './api/api.js';

import ProductModelMySQL from './models/product-mysql.js';
import ProductTypeModelMySQL from './models/productType-mysql.js';
import UserModelMySQL from './models/user-mysql.js';
import InvoiceModelMySQL from './models/invoice-mysql.js';

// Load environment variables
process.loadEnvFile();

const PORT = process.env.PORT || 3000;

/**
 * @route /api
 * @description Routes for API-related operations
 */
app.use('/api', APIRoutes({
  userModel: UserModelMySQL,
  productModel: ProductModelMySQL,
  productTypeModel: ProductTypeModelMySQL,
  invoiceModel: InvoiceModelMySQL
}));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});