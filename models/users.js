import { StoredProcedure } from './../connections/db.js';

export default class UserModel {

  constructor({ name, lastname, username, password, id, state, dateCreated, date_created }) {
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    if (id) this.id = id;
    if (password) this.password = password;
    if (state) this.state = state;
    if (dateCreated) this.dateCreated = Date(dateCreated);
    if (date_created) this.dateCreated = Date(date_created);
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

  static parseUserArray(users) {
    return Array.from(users, user => new UserModel(user));
  }

  static async createUser(userData) {
    try {
      const { registerParams } = new UserModel(userData);
      const { affectedRows } = await StoredProcedure('CreateUser', registerParams);

      if (affectedRows === 1) return { saved: true };
    } catch (err) {
      throw new Error('Error while creating user');
    }
  }

  static async activateUser(userId) {
    try {
      const { affectedRows } = await StoredProcedure('UpdateUserState', [userId, true]);

      if (affectedRows === 1) return { userState: true };
    } catch (err) {
      throw new Error('Error while deleting user');
    }
  }

  static async disableUser(userId) {
    try {
      const { affectedRows } = await StoredProcedure('UpdateUserState', [userId, false]);

      if (affectedRows === 1) return { userState: false };
    } catch (err) {
      throw new Error('Error while deleting user');
    }
  }

  static async getAllUsers() {
    try {
      const [rows] = await StoredProcedure('GetAllUsers', null, UserModel.parseUserArray);

      return rows;
    } catch (err) {
      return new Error('Error while fetching users', err);
    }
  }

  static async getUserById(userId) {
    try {
      const [rows] = await StoredProcedure('GetUserById', [userId], UserModel.parseUserArray);

      return rows[0];
    } catch (err) {
      return new Error('Error while fetching user', err);
    }
  }

  static async updateUser(userData) {
    try {
      const { updateParams } = new UserModel(userData);
      const { affectedRows } = await StoredProcedure('UpdateUser', updateParams);

      if (affectedRows === 1) return { userUpdated: true };

    } catch (err) {
      throw new Error('Error while updating user');
    }
  }

  static async updateUserPassword(username, password) {
    try {
      const { authParams } = new UserModel({ username, password });
      const { affectedRows } = await StoredProcedure('UpdateUserPassword', authParams);

      if (affectedRows === 1) return { userUpdated: true };
    } catch (err) {
      throw new Error('Error while updating password');
    }
  }

  static async validatePassword(username, password) {
    try {
      const { authParams } = new UserModel({ username, password });
      const [rows] = await StoredProcedure(
        'ValidatePasswordHash',
        authParams
      );

      return rows;
    } catch (err) {
      throw new Error('Error while validating password');
    }
  }
}
