import jwt from 'jsonwebtoken';

export const socketAuth = (socket, next) => {
  const cookie = socket?.handshake?.headers?.cookie?.split('auth=')[1];
  if (cookie) {
    const decoded = jwt.verify(cookie, process.env.SECRET);
    socket.userId = decoded.id;
    next();
  } else {
    return socket.emit('Not Authorized');
  }
};
