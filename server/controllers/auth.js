import { Router } from 'express';
import { loginUser, registerUser } from '../services/authService.js';

const auth = Router();

auth.post('/register', async (req, res) => {
  try {
    const token = await registerUser(req.body);
    res.cookie('auth', token).json({ auth: token });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

auth.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.cookie('auth', token).json({ auth: token });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

auth.get('', async (req, res) => {});

export default auth;
