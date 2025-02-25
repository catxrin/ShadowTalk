import { Router } from 'express';
import auth from './controllers/auth.js';
import { isAuth } from './middlewares/auth.js';

const routes = Router();

routes.use('/auth', isAuth, auth);

export default routes;
