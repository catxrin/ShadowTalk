import { Router } from 'express';
import { Conversation } from '../models/Conversation.js';

const conversation = Router();

conversation.get('/:id', async (req, res) => {
  const conv = await Conversation.findOne({
    participants: { $all: [res.locals.user.id, req.params.id] },
  })
    .populate('messages')
    .populate({ path: 'messages', populate: 'author' });
  if (conv) {
    return res.json(conv);
  }
  res.json([]);
});

export default conversation;
