import express from 'express';
import { validateAuthUser } from '../../middlewares/auth.js';
import {
  activateUser,
  createUser,
  disableUser,
  getAllUsers,
  getActiveUsers,
  getDisabledUsers,
  getUserById,
  updateUser,
  updateUserPassword,
  validatePassword,
} from './../controllers/users.js';

const router = express.Router();

/**
 * @route GET /users
 * @description Gets all users
 * @access Public
 */
router.get('/', [validateAuthUser], getAllUsers);

/**
 * @route GET /users/active
 * @description Gets all disabled users
 * @access Public
 */
router.get('/active', [validateAuthUser], getActiveUsers);

/**
 * @route GET /users/disabled
 * @description Gets all disabled users
 * @access Public
 */
router.get('/disabled', [validateAuthUser], getDisabledUsers);

/**
 * @route GET /users/:id
 * @description Gets a user by ID
 * @access Public
 */
router.get('/:id', [validateAuthUser], getUserById);

/**
 * @route POST /users
 * @description Creates a new user
 * @access Public
 */
router.post('/', createUser);

/**
 * @route POST /users/validate-password
 * @description Validates a user's password
 * @access Public
 */
router.post('/validate-password', validatePassword);

/**
 * @route PUT /users/:id
 * @description Update a user by ID
 * @access Public
 */
router.put('/:id', [validateAuthUser], updateUser);

/**
 * @route PATCH /users/:id
 * @description Updates a user by ID
 * @access Public
 */
router.patch('/:id', [validateAuthUser], activateUser);

/**
 * @route PUT /users/:id/password
 * @description Updates a user's password
 * @access Public
 */
router.put('/:id/password', [validateAuthUser], updateUserPassword);

/**
 * @route DELETE /users/:id
 * @description Disables a user
 * @access Public
 */
router.delete('/:id', [validateAuthUser], disableUser);

export default router;