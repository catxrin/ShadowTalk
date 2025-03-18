import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import routes from './routes.js';
import { isAuth } from './middlewares/auth.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

dotenv.config({ path: './../.env' });

// Connecting to the database
try {
  await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
  console.log('Connected to DB');
} catch (error) {
  console.error(error.message);
}

// Express Configurations
const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:5173`,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  socket.on('join_chat', userId => {
    socket.join(userId);
  });

  socket.on('send_message', data => {
    socket.to(data.userId).emit('receive_message', data);
  });
});

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(isAuth);

app.use(routes);

server.listen(process.env.PORT, () => console.log(`🍵 Server is listening on http://localhost:${process.env.PORT}`));
