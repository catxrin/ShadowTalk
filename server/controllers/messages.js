import { Router } from 'express';
import { Message } from '../models/Messages.js';
import { findConversation } from '../services/conversationsService.js';

const message = Router();

message.post('/:id', async (req, res) => {
  const userId = res.locals.user.id;

  const conversation = await findConversation(userId, req.params.id);

  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found' });
  }

  conversation.populate('messages');

  const message = new Message({ author: userId, body: req.body.message });
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
