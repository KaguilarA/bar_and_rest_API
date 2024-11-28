import executeProcedure from '../connections/db.js';

class UserModel {
  async getAllUsers() {
    const result = await executeProcedure('GetAllUsers');
    return result[0]; 
  }

  async getUserById(userId) {
    const result = await executeProcedure('GetUserById', [userId]);
    return result[0][0];
  }

  async createUser(name, username, password, state) {
    const result = await executeProcedure('CreateUser', [name, username, password, state]);
    return result;
  }

  async updateUser(userId, name, username, password, state) {
    const result = await executeProcedure('UpdateUser', [userId, name, username, password, state]);
    return result;
  }
}

export default new UserModel();