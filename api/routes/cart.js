import express from "express";
import validateAuthUser from "../../middlewares/auth.js";
import validateUserPermissions from "../../middlewares/permissions.js";
import CartController from "../controllers/cart.js";

export default (model) => {
  const controller = new CartController(model);
  const router = express.Router();

  /**
   * @route GET /invoices
   * @description Get all invoices
   * @access Public
   */
  router.get(
    "/",
    [validateAuthUser, validateUserPermissions],
    controller.getAllInvoices
  );

  /**
   * @route GET /invoices/:id
   * @description Get an invoice by ID
   * @access Public
   */
  router.get("/:id", controller.getInvoiceById);

  /**
   * @route GET /invoices/:id/total
   * @description Get the total amount of an invoice
   * @access Public
   */
  router.get("/:id/total", controller.getInvoiceTotal);

  /**
   * @route POST /invoices
   * @description Create a new invoice
   * @access Public
   */
  router.post(
    "/",
    [validateAuthUser, validateUserPermissions],
    controller.createInvoice
  );

  /**
   * @route POST /invoices/state
   * @description Get invoices by state
   * @access Public
   */
  router.post(
    "/state",
    [validateAuthUser, validateUserPermissions],
    controller.getInvoiceByState
  );

  /**
   * @route PUT /invoices/:id/state
   * @description Update the state of an invoice
   * @access Public
   */
  router.put(
    "/:id/state",
    [validateAuthUser, validateUserPermissions],
    controller.updateInvoiceState
  );

  /**
   * @route PUT /invoices/:id/quantity
   * @description Update the quantity of a product in an invoice
   * @access Public
   */
  router.put(
    "/:id/quantity",
    [validateAuthUser, validateUserPermissions],
    controller.updateInvoiceQuantity
  );

  return router;
};
