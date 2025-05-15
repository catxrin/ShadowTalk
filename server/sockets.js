import { Message } from './models/Messages.js';
import { Conversation } from './models/Conversation.js';

import { findConversation } from './services/conversationsService.js';

export const sockets = (io, socket) => {
  socket.on('send_message', async newMessage => {
    const userId = socket?.userId;

    let conversation = await findConversation(userId, newMessage.partnerId)
      .populate('messages')
      .populate('participants.user');

    if (!conversation) {
      conversation = new Conversation({
        participants: [
          { user: userId, nickname: '', theme: 'Default' },
          { user: newMessage.partnerId, nickname: '', theme: 'Default' },
        ],
      });
    }

    const message = new Message({
      author: userId,
      body: newMessage.message,
    });

    await message.populate('author.user');
    await message.save();

    conversation?.messages?.push(message._id);
    conversation.updatedAt = message.updatedAt;

    await conversation.save();
    await conversation.populate('participants.user');

    return io.to([newMessage.partnerId, userId]).emit('messages', { message: message, conversation: conversation });
  });

  socket.on('edit_message', async newMessage => {
    const updatedMessage = await Message.findByIdAndUpdate(newMessage._id, { body: newMessage.body }, { new: true });

    return io.to([newMessage.partnerId, socket?.userId]).emit('edit_message', updatedMessage);
  });

  socket.on('delete_message', async message => {
    await Message.findByIdAndDelete(message?.messageId);
    return io.to([message.partnerId, socket?.userId]).emit('deleted_message', message);
  });

  socket.on('delete_conversation', async chatId => {
    await Conversation.findByIdAndDelete(chatId);
    return io.emit('deleted_conversation', chatId);
  });

  // socket.on('block_user', async partnerId => {
  //   const userId = socket?.userId;
  //   const conversation = await findConversation(userId, partnerId).populate('participants.user');

  //   conversation.blocked = !conversation.blocked;
  //   conversation.save();

  //   return io.to([partnerId, userId]).emit('blocked', conversation);
  // });

  socket.on('disconnect', () => console.log('User disconnected'));

  io.engine.on('connection_error', err => {
    console.log(err.message);
  });
};
