import { Router } from 'express';
import { Conversation } from '../models/Conversation.js';

const conversation = Router();

conversation.get('/:id', async (req, res) => {
  const conv = await Conversation.findOne({
    participants: { $all: [res.locals.user.id, req.params.id] },
  })
    .populate('messages')
    .populate('participants')
    .populate({ path: 'messages', populate: 'author' });
  if (conv) {
    return res.json(conv);
  }

  res.json([]);
});

conversation.get('', async (req, res) => {
  const convs = await Conversation.find({
    participants: res.locals.user.id,
  })
    .populate('participants')
    .sort({ updatedAt: -1 });
  res.json(convs);
});

conversation.patch('/:id/save', async (req, res) => {
  const conv = await Conversation.findOne({
    participants: { $all: [res.locals.user.id, req.params.id] },
  }).populate('participants');

  conv.saved = !conv.saved;
  conv.save();

  const filtered = conv.participants.filter(x => x._id !== res.locals.user.id);
  res.json(filtered);
});

// query parameter saved from the BE

export default conversation;
