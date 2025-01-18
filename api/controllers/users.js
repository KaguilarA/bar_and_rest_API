import BaseController from '../../utils/baseController.js';

export default class UsersController extends BaseController {

  /**
   * Activates a user.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  activateUser = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) res.status(400).json({ message: 'User ID is required' });
      const user = await this.model.updateState(+id, true);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Creates a new user.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  createUser = async (req, res) => {
    try {
      const user = req.body;
      if (!user.name || !user.lastname || !user.username || !user.password) {
        res.status(400).json({ message: 'All user fields are required' });
      }
      const newUser = await this.model.register(user);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }

  /**
   * Disables a user.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  disableUser = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) res.status(400).json({ message: 'User ID is required' });
      const user = await this.model.updateState(+id, false);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Gets all users.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  getAllUsers = async (req, res) => {
    try {
      const users = await this.model.getAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Gets all active users.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  getActiveUsers = async (req, res) => {
    try {
      const users = await this.model.getByState(true);
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Gets all disabled users.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  getDisabledUsers = async (req, res) => {
    try {
      const users = await this.model.getByState(false);
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Gets a user by ID.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) res.status(400).json({ message: 'User ID is required' });
      const user = await this.model.getById(+id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Updates a user.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  updateUser = async (req, res) => {
    try {
      const user = req.body;
      const { id } = req.params;
      if (!id) res.status(400).json({ message: 'User ID is required' });
      const updatedUser = await this.model.update({ ...user, id: +id });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Updates a user's password.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  updateUserPassword = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) res.status(400).json({ message: 'Username and password are required' });
      const updatedUser = await this.model.updatePassword(username, password);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  /**
   * Validates a user's password.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  validatePassword = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) res.status(400).json({ message: 'Username and password are required' });
      const isValid = await this.model.validatePassword(username, password);
      res.status(200).json(isValid);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}