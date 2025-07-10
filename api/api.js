import express from "express";

import UserRoutes from "./routes/users.js";
import ProductRoutes from "./routes/products.js";
import ProductTypeRoutes from "./routes/product-types.js";
import InvoiceRoutes from "./routes/invoices.js";

export default ({
  businessModel,
  invoiceModel,
  permissionModel,
  productModel,
  productTypeModel,
  promoModel,
  statesModel,
  userModel,
}) => {
  const router = express.Router();

  /**
   * @route /users
   * @description Routes for user-related operations
   */
  router.use("/users", UserRoutes(userModel));

  /**
   * @route /product-types
   * @description Routes for product type-related operations
   */
  router.use("/product-types", ProductTypeRoutes(productTypeModel));

  /**
   * @route /products
   * @description Routes for product-related operations
   */
  router.use("/products", ProductRoutes(productModel));

  /**
   * @route /invoices
   * @description Routes for invoice-related operations
   */
  router.use("/invoices", InvoiceRoutes(invoiceModel));

  return router;
};
