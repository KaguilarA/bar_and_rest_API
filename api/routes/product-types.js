import express from "express";
import validateAuthUser from "../../middlewares/auth.js";
import validateUserPermissions from "../../middlewares/permissions.js";
import ProductTypeController from "../controllers/productType.js";

export default (model) => {
  const controller = new ProductTypeController(model);
  const router = express.Router();

  /**
   * @route GET /product-types
   * @description Get all product types
   * @access Public
   */
  router.get("/", controller.getAllProductTypes);

  return router;
}