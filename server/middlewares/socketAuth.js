import jwt from 'jsonwebtoken';

export const socketAuth = (socket, next) => {
  const cookie = socket?.handshake?.headers?.cookie?.split('auth=')[1];

  if (cookie) {
    try {
      const decoded = jwt.verify(cookie, process.env.SECRET);
      socket.userId = decoded.id;
      socket.join(decoded.id);
      next();
    } catch (error) {
      // return socket.emit(error);
    }
  } else {
    return socket.emit('Not Authorized');
  }
};
