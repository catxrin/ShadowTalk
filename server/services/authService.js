import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async data => {
  const isExistingUser = await User.findOne({ email: data.email });
  if (isExistingUser) {
    throw new Error('This user already exists!');
  }

  const user = await User.create(data);
  const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: '6h',
  });
  return token;
};

export const loginUser = async data => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error('Wrong credentials!');
  }
  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
  if (isPasswordCorrect) {
    const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: '6h',
    });
    return token;
  } else {
    throw new Error('Wrong credentials!');
  }
};
