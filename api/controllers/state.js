import BaseController from "../../utils/baseController.js";

export default class extends BaseController {

  /**
   * Gets all states
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  getAll = async (req, res) => {
    try {
      const states = await this.model.find({}).select("-type");

      res.status(200).json(states);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Gets all states for the business.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   *  @return {Promise<void>}|
   */
  getBusinessStates = async (req, res) => {
    try {
      const states = await this.model.find({ type: "business" }).select("-type");
      res.status(200).json(states);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Gets all state for the cart.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   *  @return {Promise<void>}|
   */
  getCartStates = async (req, res) => {
    try {
      const states = await this.model.find({ type: "cart" }).select("-type");
      res.status(200).json(states);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Gets all states for the menu items.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @return {Promise<void>}|
   */
  getMenuItemsStates = async (req, res) => {
    try {
      const states = await this.model.find({ type: "menu items" }).select("-type");
      res.status(200).json(states);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Gets all states for the users.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   *  @return {Promise<void>}|
   */
  getUsersStates = async (req, res) => {
    try {
      const states = await this.model.find({ type: "users" }).select("-type");
      res.status(200).json(states);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Register a new state.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  register = async (req, res) => {
    try {
      const newModel = new this.model({ ...req.body });
      const registeredModel = await newModel.save();

      res.status(201).json(registeredModel);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }
}