import { Router } from 'express';
import auth from './controllers/auth.js';
import user from './controllers/user.js';
import message from './controllers/messages.js';
import conversation from './controllers/conversation.js';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/message', message);
routes.use('/conversation', conversation);

export default routes;
