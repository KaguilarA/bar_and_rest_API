import mysqlConnection from './../connections/db.js';

class User {
  id;

  constructor(id = null, name, username, password, state) {
    if (id) this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.state = state;
  }

  async save() {
    try {
      
    } catch (err) {
      throw new Error('Error while saving user');
    }
  }

  async update() {
    try {
      
    } catch (err) {
      throw new Error('Error while updating user');
    }
  }
}

class UserModel {

  async getAllUsers() {
    try {
      const [rows] = await mysqlConnection.query('CALL GetAllUsers()');

      rows[0].forEach(({ id, name, username, password, state }, i) => 
        rows[0][i] = new User(id, name, username, password, state)
      );

      return rows[0];
    } catch (err) {
      throw new Error('Error while fetching users');
    }
  }
}

export default new UserModel();