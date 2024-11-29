import express from 'express';
import bodyParser from 'body-parser';
import UsersRoutes from './routes/users.js';
import ProductsRoutes from './routes/products.js';

process.loadEnvFile();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', UsersRoutes);

app.use('/products', ProductsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});