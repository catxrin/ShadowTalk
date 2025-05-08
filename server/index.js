import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { sockets } from './sockets.js';

import routes from './routes.js';
import { createServer } from 'node:http';

import { Server } from 'socket.io';
import { isAuth } from './middlewares/auth.js';
import { socketAuth } from './middlewares/socketAuth.js';

dotenv.config({ path: './../.env' });

// Connecting to the database
try {
  await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
  console.log('Connected to DB');
} catch (error) {
  console.error(error.message);
}

// Express Configurations
const app = express();
app.use(cors());
const server = createServer(app);

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(isAuth);
app.use(routes);

// Socket
const io = new Server(server, {
  cors: {
    origin: `http://localhost:5173`,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.use(socketAuth);

io.on('connection', socket => {
  sockets(io, socket);
});

server.listen(process.env.PORT, () => console.log(`🍵 Server is listening on http://localhost:${process.env.PORT}`));
