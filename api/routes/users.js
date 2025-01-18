import express from 'express';
import { validateAuthUser } from '../../middlewares/auth.js';
import UsersController from './../controllers/users.js';

export default (userModel) => {
  const userController = new UsersController(userModel);
  const router = express.Router();

  /**
   * @route GET /users
   * @description Gets all users
   * @access Public
   */
  router.get('/', [validateAuthUser], userController.getAllUsers);

  /**
   * @route GET /users/active
   * @description Gets all disabled users
   * @access Public
   */
  router.get('/active', [validateAuthUser], userController.getActiveUsers);

  /**
   * @route GET /users/disabled
   * @description Gets all disabled users
   * @access Public
   */
  router.get('/disabled', [validateAuthUser], userController.getDisabledUsers);

  /**
   * @route GET /users/:id
   * @description Gets a user by ID
   * @access Public
   */
  router.get('/:id', [validateAuthUser], userController.getUserById);

  /**
   * @route POST /users
   * @description Creates a new user
   * @access Public
   */
  router.post('/', userController.createUser);

  /**
   * @route POST /users/validate-password
   * @description Validates a user's password
   * @access Public
   */
  router.post('/validate-password', userController.validatePassword);

  /**
   * @route PUT /users/:id
   * @description Update a user by ID
   * @access Public
   */
  router.put('/:id', [validateAuthUser], userController.updateUser);

  /**
   * @route PATCH /users/:id
   * @description Updates a user by ID
   * @access Public
   */
  router.patch('/:id', [validateAuthUser], userController.activateUser);

  /**
   * @route PUT /users/:id/password
   * @description Updates a user's password
   * @access Public
   */
  router.put('/:id/password', [validateAuthUser], userController.updateUserPassword);

  /**
   * @route DELETE /users/:id
   * @description Disables a user
   * @access Public
   */
  router.delete('/:id', [validateAuthUser], userController.disableUser);


  return router;
}