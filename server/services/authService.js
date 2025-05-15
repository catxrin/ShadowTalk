import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const registerUser = async data => {
  const isExistingUser = await User.findOne({ email: data.email });
  if (isExistingUser) {
    throw new Error('This user already exists!');
  }

  const user = await User.create(data);
  return user._id;
};

export const loginUser = async data => {
  const user = await User.findOne({ email: data.email }).select('+password');
  if (!user) {
    throw new Error('Wrong credentials!');
  }
  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
  if (!isPasswordCorrect) throw new Error('Wrong credentials!');

  return user._id;
};
