import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  activateUser,
  disableUser,
  updateUser,
  updateUserPassword,
  validatePassword
} from './../controllers/users.js';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.post('/validate-password', validatePassword);

router.delete('/:id', disableUser);

router.patch('/:id', activateUser);

router.patch('/:id/password', updateUserPassword);

router.put('/:id', updateUser);

export default router;