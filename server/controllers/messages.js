import { Router } from 'express';
import { Conversation } from '../models/Conversation.js';
import { Message } from '../models/Messages.js';

const message = Router();

message.post('/:id', async (req, res) => {
  const user = res.locals.user.id;

  const conversation = await Conversation.findOne({
    participants: {
      $all: [{ $elemMatch: { user: user } }, { $elemMatch: { user: req.params.id } }],
    },
  }).populate('messages');
  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found' });
  }

  const message = new Message({ author: user, body: req.body.message });
  await message.save();

  conversation?.messages?.push(message._id);
  await conversation.save();

  res.json({
    message: 'Message sent successfully',
    conversationId: conversation._id,
    messageId: message._id,
    messageBody: message.body,
  });
});

export default message;
