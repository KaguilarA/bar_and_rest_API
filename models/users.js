import { BaseModel } from "./../utils/baseModel.js";

export default class UserModel extends BaseModel {
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
    super(id, state, date_created);
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    if (password) this.password = password;
    if (dateCreated) this.dateCreated = Date(dateCreated);
  }

  get authParams() {
    return [this.username, this.password];
  }

  get registerParams() {
    return [this.name, this.lastname, this.username, this.password];
  }

  get updateParams() {
    return [this.id, this.name, this.lastname, this.username];
  }

  static async createUser(userData) {
    try {
      const { registerParams } = new UserModel(userData);
      const { affectedRows } = await UserModel.storedProcedure(
        "CreateUser",
        registerParams
      );

      if (affectedRows === 1) return { saved: true };
    } catch (err) {
      throw new Error("Error while creating user");
    }
  }

  static async activateUser(userId) {
    try {
      const { affectedRows } = await UserModel.storedProcedure(
        "UpdateUserState",
        [userId, true]
      );

      if (affectedRows === 1) return { userState: true };
    } catch (err) {
      throw new Error("Error while deleting user");
    }
  }

  static async disableUser(userId) {
    try {
      const { affectedRows } = await UserModel.storedProcedure(
        "UpdateUserState",
        [userId, false]
      );

      if (affectedRows === 1) return { userState: false };
    } catch (err) {
      throw new Error("Error while deleting user");
    }
  }

  static async getAllUsers() {
    try {
      const [rows] = await UserModel.storedProcedure(
        "GetAllUsers",
        null,
        (users) => Array.from(users, (user) => new UserModel(user))
      );

      return rows;
    } catch (err) {
      return new Error("Error while fetching users", err);
    }
  }

  static async getUserById(userId) {
    try {
      const [rows] = await UserModel.storedProcedure(
        "GetUserById",
        [userId],
        (users) => Array.from(users, (user) => new UserModel(user))
      );

      return rows[0];
    } catch (err) {
      return new Error("Error while fetching user", err);
    }
  }

  static async updateUser(userData) {
    try {
      const { updateParams } = new UserModel(userData);
      const { affectedRows } = await UserModel.storedProcedure(
        "UpdateUser",
        updateParams
      );

      if (affectedRows === 1) return { userUpdated: true };
    } catch (err) {
      throw new Error("Error while updating user");
    }
  }

  static async updateUserPassword(username, password) {
    try {
      const { authParams } = new UserModel({ username, password });
      const { affectedRows } = await UserModel.storedProcedure(
        "UpdateUserPassword",
        authParams
      );

      if (affectedRows === 1) return { userUpdated: true };
    } catch (err) {
      throw new Error("Error while updating password");
    }
  }

  static async validatePassword(username, password) {
    try {
      const { authParams } = new UserModel({ username, password });
      const [rows] = await UserModel.storedProcedure(
        "ValidatePasswordHash",
        authParams
      );

      return { isValid: !!rows[0].is_valid };
    } catch (err) {
      throw new Error("Error while validating password");
    }
  }
}
