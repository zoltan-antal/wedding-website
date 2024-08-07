import { Router } from 'express';
import loginController from '../controllers/loginController';

const loginRoutes = Router();

loginRoutes.post('/', (req, res, next) => {
  loginController.loginGuest(req, res).catch(next);
});

export default loginRoutes;
