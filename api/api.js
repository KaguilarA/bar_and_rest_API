import express from "express";

import CartRoutes from "./routes/cart.js";
import PermissionRoutes from "./routes/permission.js";
import ProductRoutes from "./routes/product.js";
import UserRoutes from "./routes/user.js";
import StateRoutes from "./routes/state.js";


export default ({
  businessModel,
  cartModel,
  permissionModel,
  productModel,
  productTypeModel,
  promoModel,
  statesModel,
  userModel,
}) => {
  const router = express.Router();

  /**
   * @route /cart
   * @description Routes for invoice-related operations
   */
  router.use("/cart", CartRoutes(cartModel));

  /**
   * @route /permission
   * @description Routes for user-related operations
   */
  router.use("/permission", PermissionRoutes(permissionModel));

  /**
   * @route /products
   * @description Routes for product-related operations
   */
  router.use("/product", ProductRoutes([productModel, productTypeModel]));

  /**
   * @route /states
   * @description Routes for user-related operations
   */
  router.use("/state", StateRoutes(statesModel));

  /**
   * @route /users
   * @description Routes for user-related operations
   */
  router.use("/user", UserRoutes(userModel));

  return router;
};
