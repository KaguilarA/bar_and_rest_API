import BaseModel from "../utils/baseModel.js";

// Stored procedures for the user model.
const proceduresIds = {
  register: "CreateUser",
  getAll: "GetAllUsers",
  getAuthData: "GetUserAuthData",
  getById: "GetUserById",
  getByState: "GetUserByState",
  updatePassword: "UpdateUserPassword",
  updateState: "UpdateUserState",
  update: "UpdateUser",
  validatePassword: "ValidatePasswordHash",
};

/**
 * UserModel class that provides methods for interacting with the user entity in the database.
 * This model extends BaseModel and uses its utilities to call stored procedures.
 * @extends BaseModel
 */
export default class UserModelMySQL extends BaseModel {
  /**
   * Constructor for the UserModel class.
   * Ensures required fields are set and validates the structure of input data.
   *
   * @param {Object} userData The user data.
   * @param {string} userData.name The name of the user.
   * @param {string} userData.lastname The last name of the user.
   * @param {string} userData.username The username of the user.
   * @param {string} [userData.password] The password of the user.
   * @param {number} [userData.id] The ID of the user.
   * @param {boolean} [userData.state] The state of the user.
   * @param {string} [userData.dateCreated] The creation date of the user in ISO format.
   */
  constructor({
    id,
    name,
    lastname,
    username,
    password,
    state,
    date_created,
  }) {
    super({ id, name, state, date_created });
    if (lastname) this.lastname = lastname;
    if (username) this.username = username;
    if (password) this.password = password;
  }

  /**
   * Gets the authentication parameters.
   * @returns {string[]} The authentication parameters.
   */
  get authParams() {
    return [this.username, this.password];
  }

  /**
   * Gets the registration parameters.
   * @returns {string[]} The registration parameters.
   */
  get registerParams() {
    return [this.name, this.lastname, this.username, this.state, this.password];
  }

  /**
   * Gets the update parameters.
   * @returns {string[]} The update parameters.
   */
  get updateParams() {
    return [this.id, this.name, this.lastname, this.username];
  }

  /**
   * Parses an array of product data and returns an array of UserModelMySQL instances.
   * @param {Array<Object>} data - The array of product data to parse.
   * @returns {Array<UserModelMySQL>} An array of UserModelMySQL instances.
   */
  static parseData(data) {
    return Array.from(data, value => new UserModelMySQL(value));
  }

  /**
   * Gets all users.
   * @returns {Promise<Array>} The list of users.
   */
  static async getAll() {
    try {
      const [rows] = await UserModelMySQL.executeProcedure(
        proceduresIds.getAll,
        null,
        UserModelMySQL.parseData
      );

      return rows;
    } catch (err) {
      throw new Error("Error while fetching users");
    }
  }

  /**
   * Gets a user by ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Object>} The user data.
   */
  static async getById(userId) {
    try {
      const [rows] = await UserModelMySQL.executeProcedure(
        proceduresIds.getById,
        [userId],
        UserModelMySQL.parseData
      );

      return rows[0];
    } catch (err) {
      throw new Error("Error while fetching user");
    }
  }

  /**
   * Gets users by state.
   * @param {boolean} state - The state of the users to fetch.
   * @returns {Promise<Array>} The list of users with the specified state.
   */
  static async getByState(state) {
    try {
      const [rows] = await UserModelMySQL.executeProcedure(
        proceduresIds.getByState,
        [state],
        UserModelMySQL.parseData
      );

      return rows;
    } catch (err) {
      throw new Error("Error while fetching users by state");
    }
  }

  /**
   * Registers a new user.
   * @param {Object} userData - The user data.
   * @returns {Promise<Object>} The result of the registration.
   */
  static async register(userData) {
    try {
      const { registerParams } = new UserModelMySQL(userData);
      const { affectedRows } = await UserModelMySQL.executeProcedure(
        proceduresIds.register,
        registerParams
      );

      if (affectedRows === 1) return { saved: true };
    } catch (err) {
      throw new Error("Error while creating user");
    }
  }

  /**
   * Updates a user.
   * @param {Object} userData - The user data.
   * @returns {Promise<Object>} The result of the update.
   */
  static async update(userData) {
    try {
      const { updateParams } = new UserModelMySQL(userData);
      const { affectedRows } = await UserModelMySQL.executeProcedure(
        proceduresIds.update,
        updateParams
      );

      if (affectedRows === 1) return { userUpdated: true };
    } catch (err) {
      throw new Error("Error while updating user");
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
      const { authParams } = new UserModelMySQL({ username, password });
      const { affectedRows } = await UserModelMySQL.executeProcedure(
        proceduresIds.updatePassword,
        authParams
      );

      if (affectedRows === 1) return { userUpdated: true };
    } catch (err) {
      throw new Error("Error while updating password");
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
      const { affectedRows } = await UserModelMySQL.executeProcedure(
        proceduresIds.updateState,
        [userId, state]
      );

      if (affectedRows === 1) return { userState: state };
    } catch (err) {
      throw new Error("Error while updating user state");
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
      const { authParams } = new UserModelMySQL({ username, password });
      const [rows] = await UserModelMySQL.executeProcedure(
        proceduresIds.validatePassword,
        authParams
      );

      return { isValid: !!rows[0].is_valid };
    } catch (err) {
      throw new Error("Error while validating password");
    }
  }
}
