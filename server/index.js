import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import routes from './routes.js';
import { Conversation } from './models/Conversation.js';
import { Message } from './models/Messages.js';
import { isAuth } from './middlewares/auth.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { socketAuth } from './middlewares/socketAuth.js';

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

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(isAuth);
app.use(routes);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:5173`,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.use(socketAuth);

io.on('connection', socket => {
  socket.on('send_message', async newMessage => {
    const user = socket?.userId;

    let conversation = await Conversation.findOne({
      participants: { $all: [user, newMessage.partnerId] },
    }).populate('messages');

    const message = new Message({ author: user, body: newMessage.message });
    await message.save();

    if (!conversation) {
      conversation = new Conversation({ participants: [user, newMessage.partnerId] });
    }

    conversation?.messages?.push(message._id);
    const populated = await conversation.populate({ path: 'messages', populate: 'author' });
    await conversation.save();
    return io.to([newMessage.partnerId, user]).emit('messages', populated.messages);
  });
});

server.listen(process.env.PORT, () => console.log(`🍵 Server is listening on http://localhost:${process.env.PORT}`));
