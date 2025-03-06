import { Router } from 'express';
import auth from './controllers/auth.js';

const routes = Router();

routes.use('/auth', auth);

export default routes;
