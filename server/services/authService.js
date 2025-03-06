import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateToken } from '../helpers.js';

export const registerUser = async data => {
  const isExistingUser = await User.findOne({ email: data.email });
  if (isExistingUser) {
    throw new Error('This user already exists!');
  }

  const user = await User.create(data);
  return await generateToken(user._id);
};

export const loginUser = async data => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error('Wrong credentials!');
  }
  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
  if (isPasswordCorrect) {
    return await generateToken(user._id);
  } else {
    throw new Error('Wrong credentials!');
  }
};
