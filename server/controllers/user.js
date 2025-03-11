import { Router } from 'express';
import User from '../models/User.js';

const user = Router();

user.get('', async (req, res) => {
  const userData = await User.findById(res.locals.user.id);
  res.json(userData);
});

export default user;
