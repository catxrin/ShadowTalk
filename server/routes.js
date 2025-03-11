import { Router } from 'express';
import auth from './controllers/auth.js';
import user from './controllers/user.js';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);

export default routes;
