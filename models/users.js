import { BaseModel } from './../utils/baseModel.js';

// Stored procedures for the user model.
const proceduresIds = {
  getAll: 'GetAllUsers',
  getById: 'GetUserById',
  getByState: 'GetUserByState',
  register: 'CreateUser',
  update: 'UpdateUser',
  updatePassword: 'UpdateUserPassword',
  updateState: 'UpdateUserState',
  validatePassword: 'ValidatePasswordHash',
};

/**
 * UserModel class that provides common methods for interacting with the user entity.
 * @extends BaseModel
 */
export default class UserModel extends BaseModel {
  /**
   * Constructor for the UserModel class.
   * @param {Object} userData - The user data.
   * @param {string} userData.name - The name of the user.
   * @param {string} userData.lastname - The lastname of the user.
   * @param {string} userData.username - The username of the user.
   * @param {string} [userData.password] - The password of the user.
   * @param {number} [userData.id] - The ID of the user.
   * @param {boolean} [userData.state] - The state of the user.
   * @param {string} [userData.dateCreated] - The creation date of the user.
   * @param {string} [userData.date_created] - The creation date of the user.
   */
  constructor({
    name,
    lastname,
    username,
    password,
    id,
    state,
    dateCreated,
    date_created,
  }) {
    super(id, state, date_created || dateCreated);
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    if (password) this.password = password;
  }

  /**
   * Gets the authentication parameters.
   * @returns {Array} The authentication parameters.
   */
  get authParams() {
    return [this.username, this.password];
  }

  /**
   * Gets the registration parameters.
   * @returns {Array} The registration parameters.
   */
  get registerParams() {
    return [this.name, this.lastname, this.username, this.password];
  }

  /**
   * Gets the update parameters.
   * @returns {Array} The update parameters.
   */
  get updateParams() {
    return [this.id, this.name, this.lastname, this.username];
  }

  /**
   * Gets all users.
   * @returns {Promise<Array>} The list of users.
   */
  static async getAll() {
    try {
      const [rows] = await UserModel.storedProcedure(
        proceduresIds.getAll,
        null,
        (users) => Array.from(users, (user) => new UserModel(user))
      );

      return rows;
    } catch (err) {
      throw new Error('Error while fetching users');
    }
  }

  /**
   * Gets a user by ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Object>} The user data.
   */
  static async getById(userId) {
    try {
      const [rows] = await UserModel.storedProcedure(
        proceduresIds.getById,
        [userId],
        (users) => Array.from(users, (user) => new UserModel(user))
      );

      return rows[0];
    } catch (err) {
      throw new Error('Error while fetching user');
    }
  }

  /**
   * Gets users by state.
   * @param {boolean} state - The state of the users to fetch.
   * @returns {Promise<Array>} The list of users with the specified state.
   */
  static async getByState(state) {
    try {
      const [rows] = await UserModel.storedProcedure(
        proceduresIds.getByState,
        [state],
        (users) => Array.from(users, (user) => new UserModel(user))
      );

      return rows;
    } catch (err) {
      throw new Error('Error while fetching users by state');
    }
  }

  /**
   * Registers a new user.
   * @param {Object} userData - The user data.
   * @returns {Promise<Object>} The result of the registration.
   */
  static async register(userData) {
    try {
      const { registerParams } = new UserModel(userData);
      const { affectedRows } = await UserModel.storedProcedure(
        proceduresIds.register,
        registerParams
      );

      if (affectedRows === 1) return { saved: true };
    } catch (err) {
      throw new Error('Error while creating user');
    }
  }

  /**
   * Updates a user.
   * @param {Object} userData - The user data.
   * @returns {Promise<Object>} The result of the update.
   */
  static async update(userData) {
    try {
      const { updateParams } = new UserModel(userData);
      const { affectedRows } = await UserModel.storedProcedure(
        proceduresIds.update,
        updateParams
      );

      if (affectedRows === 1) return { userUpdated: true };
    } catch (err) {
      throw new Error('Error while updating user');
    }
  }

  /**
   * Updates a user's password.
   * @param {string} username - The username of the user.
   * @param {string} password - The new password of the user.
   * @returns {Promise<Object>} The result of the password update.
   */
  static async updatePassword(username, password) {
    try {
      const { authParams } = new UserModel({ username, password });
      const { affectedRows } = await UserModel.storedProcedure(
        proceduresIds.updatePassword,
        authParams
      );

      if (affectedRows === 1) return { userUpdated: true };
    } catch (err) {
      throw new Error('Error while updating password');
    }
  }

  /**
   * Updates the state of a user.
   * @param {number} userId - The ID of the user.
   * @param {boolean} state - The new state of the user.
   * @returns {Promise<Object>} The result of the state update.
   * @throws {Error} If there is an error while updating the user's state.
   */
  static async updateState(userId, state) {
    try {
      const { affectedRows } = await UserModel.storedProcedure(
        proceduresIds.updateState,
        [userId, state]
      );

      if (affectedRows === 1) return { userState: state };
    } catch (err) {
      throw new Error('Error while updating user state');
    }
  }

  /**
   * Validates a user's password.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<Object>} The result of the password validation.
   */
  static async validatePassword(username, password) {
    try {
      const { authParams } = new UserModel({ username, password });
      const [rows] = await UserModel.storedProcedure(
        proceduresIds.validatePassword,
        authParams
      );

      return { isValid: !!rows[0].is_valid };
    } catch (err) {
      throw new Error('Error while validating password');
    }
  }
}