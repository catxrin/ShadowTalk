import { Conversation } from './models/Conversation.js';
import { Message } from './models/Messages.js';

export const sockets = (io, socket) => {
  socket.on('send_message', async newMessage => {
    const user = socket?.userId;
    let conversation = await Conversation.findOne({
      participants: {
        $all: [{ $elemMatch: { user: user } }, { $elemMatch: { user: newMessage.partnerId } }],
      },
    })
      .populate('messages')
      .populate('participants.user');

    if (!conversation) {
      conversation = new Conversation({
        participants: [
          { user: user, nickname: '', theme: 'Default' },
          { user: newMessage.partnerId, nickname: '', theme: 'Default' },
        ],
      });
    }

    const message = new Message({
      author: user,
      body: newMessage.message,
    });

    await message.populate('author.user');
    await message.save();

    conversation?.messages?.push(message._id);
    conversation.updatedAt = message.updatedAt;
    await conversation.save();
    await conversation.populate('participants.user');

    return io.to([newMessage.partnerId, user]).emit('messages', { message: message, conversation: conversation });
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

  socket.on('block_user', async partnerId => {
    const conv = await Conversation.findOne({
      participants: {
        $all: [{ $elemMatch: { user: socket?.userId } }, { $elemMatch: { user: partnerId } }],
      },
    }).populate('participants.user');

    conv.blocked = !conv.blocked;
    conv.save();

    return io.to([partnerId, socket?.userId]).emit('blocked', conv);
  });

  io.engine.on('connection_error', err => {
    console.log(err.message);
  });
};
