import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const registerUser = async data => {
  const isExistingUser = await User.findOne({ email: data.email });
  if (isExistingUser) {
    throw new Error('This user already exists!');
  }

  await User.create(data);
  const token = await jwt.sign({ username: data.username, email: data.email }, process.env.SECRET, {
    expiresIn: '6h',
  });
  return token;
};
