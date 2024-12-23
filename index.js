import express from 'express';
import bodyParser from 'body-parser';
import APIRoutes from './api/api.js';

// Load environment variables
process.loadEnvFile();

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to Pug
app.set('view engine', 'pug');

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @route /api
 * @description Routes for API-related operations
 */
app.use('/api', APIRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});