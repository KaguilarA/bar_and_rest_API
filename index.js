import db from './db/db.js';
import app from './app.js';

// Load environment variables
process.loadEnvFile();

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  db();
  console.log(`Server is running on port ${PORT}`);
});