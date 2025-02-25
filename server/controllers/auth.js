import { Router } from 'express';
import { registerUser } from '../services/authService.js';

const auth = Router();

auth.post('/register', async (req, res) => {
  const token = await registerUser(req.body);
  res.cookie('auth', token).status(200);
});


export default auth;
