import UserModel from './../models/users.js';

export const activateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.activateUser(parseInt(id));
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await UserModel.createUser(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}

export const disableUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.disableUser(parseInt(id));
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.getUserById(parseInt(id));
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = req.body;
    const updatedUser = await UserModel.updateUser(user);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}