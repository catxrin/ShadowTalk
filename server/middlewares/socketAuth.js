import jwt from 'jsonwebtoken';

export const socketAuth = (socket, next) => {
  const cookie = socket?.handshake?.headers?.cookie?.split('auth=')[1];

  if (!cookie) {
    return next(new Error('Not Authorized: No token'));
  }

  try {
    const decoded = jwt.verify(cookie, process.env.SECRET);
    socket.userId = decoded.id;
    socket.join(decoded.id);
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
};
