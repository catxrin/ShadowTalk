import jwt from 'jsonwebtoken';

export const isAuth = async (req, res, next) => {
  const baseUrl = req.path;
  const token = req.cookies.auth;

  if (baseUrl.includes('login') || baseUrl.includes('register')) return next();

  if (!token) return res.status(401).json({ message: 'Not authorized!' });

  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    res.locals.user = { id: decoded.id };

    return next();
  } catch (error) {
    return res.status(400).json({ message: error?.message });
  }
};
