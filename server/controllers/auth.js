import { Router } from 'express';
import { loginUser, registerUser } from '../services/authService.js';
import { generateToken } from '../helpers.js';

const auth = Router();

auth.post('/register', async (req, res) => {
  try {
    const userId = await registerUser(req.body);
    res.cookie('auth', await generateToken(userId)).json({ id: userId });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

auth.post('/login', async (req, res) => {
  try {
    const userId = await loginUser(req.body);
    res.cookie('auth', await generateToken(userId)).json({ id: userId });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

export default auth;
