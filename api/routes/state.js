import express from "express";
import validateAuthUser from "../../middlewares/auth.js";
import validateUserPermissions from "../../middlewares/permissions.js";
import StateController from "../controllers/state.js";

export default (model) => {
  const controller = new StateController(model);
  const router = express.Router();

  /**
   * @route GET /
   * @description Get all product types
   * @access Public
   */
  router.get("/", controller.getAll);

  /**
   * @route GET //menu-items
   * @description Get all product types
   * @access Public
   */
  router.get("/business", controller.getBusinessStates);

  /**
   * @route GET /menu-items
   * @description Get all product types
   * @access Public
   */
  router.get("/menu-items", controller.getMenuItemsStates);

  /**
   * @route GET /users
   * @description Get all product types
   * @access Public
   */
  router.get("/users", controller.getUsersStates);

  /**
   * @route POST /
   * @description Creates a new user
   * @access Public
   */
  router.post("/", controller.register);

  return router;
};
