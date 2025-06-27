import { Router } from 'express';

import { generateToken } from '../helpers.js';
import { loginUser, registerUser } from '../services/authService.js';

const auth = Router();

auth.post('/register', async (req, res) => {
  try {
    const userId = await registerUser(req.body);
    const token = await generateToken(userId);

    res.cookie('auth', token).json({ id: userId });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

auth.post('/login', async (req, res) => {
  try {
    const userId = await loginUser(req.body);
    const token = await generateToken(userId);

    res.cookie('auth', token).json({ id: userId });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

auth.get('/logout', async (req, res) => {
  try {
    res.clearCookie('auth');
    res.status(200).end();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

export default auth;
