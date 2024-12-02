import { BaseModel } from './../utils/baseModel.js';

const proceduresIds = {
  getAll: 'GetAllUsers',
  getById: 'GetUserById',
  register: 'CreateUser',
  update: 'UpdateUser',
  updatePassword: 'UpdateUserPassword',
  updateState: 'UpdateUserState',
  validatePassword: 'ValidatePasswordHash',
}

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

  static async activate(userId) {
    try {
      const { affectedRows } = await UserModel.storedProcedure(
        proceduresIds.updateState,
        [userId, true]
      );

      if (affectedRows === 1) return { userState: true };
    } catch (err) {
      throw new Error('Error while deleting user');
    }
  }

  static async disable(userId) {
    try {
      const { affectedRows } = await UserModel.storedProcedure(
        proceduresIds.updateState,
        [userId, false]
      );

      if (affectedRows === 1) return { userState: false };
    } catch (err) {
      throw new Error('Error while deleting user');
    }
  }

  static async getAll() {
    try {
      const [rows] = await UserModel.storedProcedure(
        proceduresIds.getAll,
        null,
        (users) => Array.from(users, (user) => new UserModel(user))
      );

      return rows;
    } catch (err) {
      return new Error('Error while fetching users', err);
    }
  }

  static async getById(userId) {
    try {
      const [rows] = await UserModel.storedProcedure(
        proceduresIds.getById,
        [userId],
        (users) => Array.from(users, (user) => new UserModel(user))
      );

      return rows[0];
    } catch (err) {
      return new Error('Error while fetching user', err);
    }
  }

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
