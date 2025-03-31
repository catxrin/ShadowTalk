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
import message from './controllers/messages.js';

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

let onlineUsers = [];
io.on('connection', socket => {
  io.emit('connected');

  socket.on('new-user-online', newUserId => {
    onlineUsers.push({ userId: newUserId, socketId: socket.id });
    io.emit('get-online-users', onlineUsers);
  });

  socket.on('send_message', async newMessage => {
    const user = socket?.userId;

    let conversation = await Conversation.findOne({
      participants: { $all: [user, newMessage.partnerId] },
    }).populate('messages');

    const message = new Message({ author: user, body: newMessage.message });
    message.populate('author');
    await message.save();

    if (!conversation) {
      conversation = new Conversation({ participants: [user, newMessage.partnerId] });
    }

    conversation?.messages?.push(message._id);
    conversation.updatedAt = message.updatedAt;
    await conversation.save();

    return io.to([newMessage.partnerId, user]).emit('messages', { message: message, conversationId: conversation._id });
  });

  socket.on('save_conversation', async partnerId => {
    const user = socket?.userId;
    const conversation = await Conversation.findOne({
      participants: { $all: [user, partnerId] },
    });

    conversation.saved = !conversation.saved;
    conversation.save();

    return io.to([partnerId, user]).emit('saved', conversation.saved);
  });

  socket.on('delete_message', async data => {
    await Message.findOneAndDelete({ _id: data.messageId });
    return io
      .to([data.partnerId, socket?.userId])
      .emit('deleted_message', { messageId: data.messageId, author: data.author });
  });

  socket.on('edit_message', async newMessage => {
    const updatedMessage = await Message.findByIdAndUpdate(
      newMessage._id,
      { body: newMessage.body },
      { new: true }
    ).populate('author');

    return io.to([newMessage.partnerId, socket?.userId]).emit('edit_message', updatedMessage);
  });
  io.engine.on('connection_error', err => {
    console.log(err.message);
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
    // send all online users to all users
    io.emit('get-online-users', onlineUsers);
  });
});

server.listen(process.env.PORT, () => console.log(`🍵 Server is listening on http://localhost:${process.env.PORT}`));
