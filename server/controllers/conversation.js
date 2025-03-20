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
    res.json(conv);
  } else {
    const newConversation = new Conversation({ participants: [res.locals.user.id, req.params.id] });
    await newConversation.save();
    const populatedConversation = await newConversation.populate('messages');

    res.json(populatedConversation);
  }
});

export default conversation;
