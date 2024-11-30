import { StoredProcedure } from './../connections/db.js';

class User {

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
    return [this.name, this.lastname, this.username];
  }

  static parseUserArray(users) {
    return Array.from(users, user => User.parseUser(user));
  }

  static parseUser(user) {
    return new User(user);
  }
}

class UserModel {

  async createUser(userData) {
    try {
      const newUser = User.parseUser(userData);
      const { affectedRows } = await StoredProcedure(
        'CreateUser',
        newUser.registerParams
      );

      if (affectedRows === 1) return { saved: true };
    } catch (err) {
      throw new Error('Error while creating user');
    }
  }

  async activateUser(userId) {
    try {
      const { affectedRows } = await StoredProcedure('UpdateUserState', [userId, true]);

      if (affectedRows === 1) return { userState: true };
    } catch (err) {
      throw new Error('Error while deleting user');
    }
  }

  async disableUser(userId) {
    try {
      const { affectedRows } = await StoredProcedure('UpdateUserState', [userId, false]);

      if (affectedRows === 1) return { userState: false };
    } catch (err) {
      throw new Error('Error while deleting user');
    }
  }

  async getAllUsers() {
    try {
      const [rows] = await StoredProcedure('GetAllUsers', null, User.parseUserArray);

      return rows;
    } catch (err) {
      return new Error('Error while fetching users', err);
    }
  }

  async getUserById(userId) {
    try {
      const [rows] = await StoredProcedure('GetUserById', [userId], User.parseUserArray);

      return rows[0];
    } catch (err) {
      return new Error('Error while fetching user', err);
    }
  }

  async updateUser(userData) {
    try {
      const user = User.parseUser(userData);
      const [rows] = await StoredProcedure(
        'UpdateUser',
        user.updateParams
      );

      return rows;
    } catch (err) {
      throw new Error('Error while updating user');
    }
  }

  async updateUserPassword(username, password) {
    try {
      const user = User.parseUser({ username, password });
      const [rows] = await StoredProcedure(
        'UpdateUserPassword',
        user.authParams
      );

      return rows;
    } catch (err) {
      throw new Error('Error while updating password');
    }
  }

  async validatePassword(username, password) {
    try {
      const user = User.parseUser({ username, password });
      const [rows] = await StoredProcedure(
        'ValidatePasswordHash',
        user.authParams
      );

      return rows;
    } catch (err) {
      throw new Error('Error while validating password');
    }
  }
}

export default new UserModel();
