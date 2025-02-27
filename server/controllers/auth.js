import { Router } from 'express';
import { registerUser } from '../services/authService.js';

const auth = Router();

auth.post('/register', async (req, res) => {
  try {
    const token = await registerUser(req.body);
    res.cookie('auth', token).end();
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
});

export default auth;
