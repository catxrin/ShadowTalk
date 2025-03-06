import jwt from 'jsonwebtoken';

export const isAuth = async (req, res, next) => {
  const baseUrl = req.path;
  const token = req.cookies.auth;

  if (baseUrl.includes('login') || baseUrl.includes('register')) return next();

  if (token) {
    const decoded = await jwt.verify(token, process.env.SECRET);
    res.json({ id: decoded.id });
    return next();
  }
  res.json({ message: 'Not authorized!' });
};
