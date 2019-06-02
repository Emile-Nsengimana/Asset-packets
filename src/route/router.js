import express from 'express';
import userController from '../controllers/userController';
import validation from '../middlewares/validations';
import auth from '../middlewares/auth';

const route = express.Router();

route.post('/auth/signup/', validation.validateUserInfo, validation.checkPassword, userController.registerUser);
route.patch('/user/disable/:email', auth, userController.disableUser);
route.patch('/user/password/:email', auth, validation.checkPassword, userController.resetPassword);
route.delete('/user/:email', auth, userController.removeUser);
route.get('/users', auth, userController.getAllUsers);

export default route;
