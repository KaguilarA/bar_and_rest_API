import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import APIRoutes from "./api/api.js";

import businessModel from "./api/models/business.js";
import cartModel from "./api/models/cart.js";
import permissionModel from "./api/models/permission.js";
import productModel from "./api/models/product.js";
import productTypeModel from "./api/models/productType.js";
import promoModel from "./api/models/promo.js";
import userModel from "./api/models/user.js";
import statesModel from "./api/models/state.js";

// Initialize the Express application
const app = express();

// Middleware to enable CORS
// This allows cross-origin requests, which is useful for APIs
app.use(cors());

// Middleware to parse JSON bodies
// This is necessary for handling JSON data in requests
app.use(express.json());

// Set the view engine to Pug
app.set("view engine", "pug");

// Middleware to log HTTP requests
app.use(morgan("dev"));

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @route /api
 * @description Routes for API-related operations
 */
app.use(
  "/api",
  APIRoutes({
    businessModel,
    cartModel,
    permissionModel,
    productModel,
    productTypeModel,
    promoModel,
    userModel,
    statesModel,
  })
);

export default app;