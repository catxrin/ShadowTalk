import { Router } from 'express';
import auth from './controllers/auth.js';
import { isAuth } from './middlewares/auth.js';

const routes = Router();

routes.use('/auth', auth);

export default routes;
