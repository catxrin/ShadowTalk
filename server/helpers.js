import jwt from 'jsonwebtoken';

export const generateToken = async userId => {
  const token = await jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: '6h',
  });
  return token;
};
