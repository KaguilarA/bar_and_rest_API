import express from "express";
import validateAuthUser from "../../middlewares/auth.js";
import validateUserPermissions from "../../middlewares/permissions.js";
import ProductController from "../controllers/products.js";

export default (model) => {
  const controller = new ProductController(model);
  const router = express.Router();

  /**
   * @route GET /products
   * @description Get all products
   * @access Public
   */
  router.get("/", controller.getAllProducts);

  /**
   * @route GET /products/:id
   * @description Get a product by ID
   * @access Public
   */
  router.get("/:id", controller.getProductById);

  /**
   * @route POST /products
   * @description Create a new product
   * @access Public
   */
  router.post(
    "/",
    [validateAuthUser, validateUserPermissions],
    controller.createProduct
  );

  /**
   * @route POST /products/type
   * @description Get products by type
   * @access Public
   */
  router.post("/type", controller.getProductByType);

  /**
   * @route PATCH /products/stock
   * @description Update the stock of a product
   * @access Public
   */
  router.patch(
    "/stock",
    [validateAuthUser, validateUserPermissions],
    controller.updateProductStock
  );

  /**
   * @route PATCH /products/:id
   * @description Activate a product
   * @access Public
   */
  router.patch(
    "/:id",
    [validateAuthUser, validateUserPermissions],
    controller.activateProduct
  );

  /**
   * @route PUT /products
   * @description Update a product
   * @access Public
   */
  router.put(
    "/",
    [validateAuthUser, validateUserPermissions],
    controller.updateProduct
  );

  /**
   * @route DELETE /products/:id
   * @description Disable a product
   * @access Public
   */
  router.delete(
    "/:id",
    [validateAuthUser, validateUserPermissions],
    controller.disableProduct
  );

  return router;
};
