import { Router } from 'express';
import { Conversation } from '../models/Conversation.js';

const conversation = Router();

conversation.get('/:id', async (req, res) => {
  const conv = await Conversation.findOne({
    participants: {
      $all: [{ $elemMatch: { user: res.locals.user.id } }, { $elemMatch: { user: req.params.id } }],
    },
  })
    .populate({
      path: 'messages',
      populate: {
        path: 'author.user',
        select: '-password -email',
      },
    })
    .populate({
      path: 'participants.user',
      select: '-password -email',
    });

  if (conv) {
    return res.json(conv);
  }

  res.json([]);
});

conversation.get('', async (req, res) => {
  const convs = await Conversation.find({
    participants: { $elemMatch: { user: res.locals.user.id } },
  })
    .populate('participants.user')
    .sort({ updatedAt: -1 });
  res.json(convs);
});

conversation.patch('/:id/save', async (req, res) => {
  const conv = await Conversation.findOne({
    participants: {
      $all: [{ $elemMatch: { user: res.locals.user.id } }, { $elemMatch: { user: req.params.id } }],
    },
  }).populate('participants.user');

  conv.saved = !conv.saved;
  conv.save();

  const filtered = conv.participants.filter(x => x._id !== res.locals.user.id);
  res.json(filtered);
});

conversation.patch('/:id/block', async (req, res) => {
  const conv = await Conversation.findOne({
    participants: {
      $all: [{ $elemMatch: { user: res.locals.user.id } }, { $elemMatch: { user: req.params.id } }],
    },
  }).populate('participants.user');

  conv.blocked = !conv.blocked;
  conv.save();

  res.json(conv);
});

conversation.patch('/:id/accent', async (req, res) => {
  const conv = await Conversation.findOne({
    participants: {
      $all: [{ $elemMatch: { user: res.locals.user.id } }, { $elemMatch: { user: req.params.id } }],
    },
  }).populate('participants.user');

  const participant = conv.participants.find(participant => participant.user._id == res.locals.user.id);
  participant.theme = req.body?.theme;

  await conv.save();
  res.json(conv);
});

conversation.patch('/:id/nickname', async (req, res) => {
  const conv = await Conversation.findOne({
    participants: {
      $all: [{ $elemMatch: { user: res.locals.user.id } }, { $elemMatch: { user: req.params.id } }],
    },
  }).populate('participants.user');

  const paricipant = conv.participants.find(participant => participant.user._id == req.params.id);
  paricipant.nickname = req.body.nickname;

  await conv.save();
  res.json(conv);
});

// query parameter saved from the BE

export default conversation;
