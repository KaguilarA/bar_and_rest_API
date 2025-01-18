import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

// Set the view engine to Pug
app.set('view engine', 'pug');

// Middleware to log HTTP requests
app.use(morgan('dev'));

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

export default app;