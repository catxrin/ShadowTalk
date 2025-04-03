import { Conversation } from './models/Conversation.js';
import { Message } from './models/Messages.js';

export const sockets = (io, socket) => {
  socket.on('send_message', async newMessage => {
    const user = socket?.userId;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [{ $elemMatch: { user: user } }, { $elemMatch: { user: newMessage.partnerId } }],
      },
    }).populate('messages');

    const message = new Message({ author: user, body: newMessage.message });
    message.populate('author');
    await message.save();

    if (!conversation) {
      conversation = new Conversation({
        participants: [
          { user: user, nickname: '' },
          { user: newMessage.partnerId, nickname: '' },
        ],
      });
    }

    conversation?.messages?.push(message._id);
    conversation.updatedAt = message.updatedAt;
    await conversation.save();

    return io.to([newMessage.partnerId, user]).emit('messages', { message: message, conversationId: conversation._id });
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
