import { Conversation } from './models/Conversation.js';
import { Message } from './models/Messages.js';

let onlineUsers = [];

export const sockets = (io, socket) => {
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
};
