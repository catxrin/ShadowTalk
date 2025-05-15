import { Router } from 'express';
import { getAll, findConversation } from '../services/conversationsService.js';

const conversation = Router();

conversation.get('/:id', async (req, res) => {
  const userId = res.locals.user.id;
  const chat = await findConversation(userId, req.params.id);

  if (!chat) return res.json([]);

  await chat.populate({
    path: 'messages',
    populate: {
      path: 'author.user',
    },
  });

  await chat.populate({
    path: 'participants.user',
  });

  return res.json(chat);
});

conversation.get('', async (req, res) => {
  const userId = res.locals.user.id;

  const allConversations = await getAll(userId).populate('participants.user').sort({ updatedAt: -1 });
  res.json(allConversations);
});

conversation.patch('/:id/save', async (req, res) => {
  const userId = res.locals.user.id;

  const chat = await findConversation(userId, req.params.id).populate('participants.user');

  chat.saved = !chat.saved;
  chat.save();

  const filtered = chat.participants.filter(participant => participant._id !== userId);
  res.json(filtered);
});

conversation.patch('/:id/accent', async (req, res) => {
  const userId = res.locals.user.id;

  const chat = await findConversation(userId, req.params.id).populate('participants.user');

  const participant = chat.participants.find(participant => participant.user._id == res.locals.user.id);
  participant.theme = req.body?.theme;

  await chat.save();
  res.json(chat);
});

conversation.patch('/:id/nickname', async (req, res) => {
  const userId = res.locals.user.id;

  const chat = await findConversation(userId, req.params.id).populate('participants.user');

  const participant = chat.participants.find(participant => participant.user._id == req.params.id);
  participant.nickname = req.body.nickname;

  await chat.save();
  res.json(chat);
});

// conversation.patch('/:id/block', async (req, res) => {
//   const conv = await Conversation.findOne({
//     participants: {
//       $all: [{ $elemMatch: { user: res.locals.user.id } }, { $elemMatch: { user: req.params.id } }],
//     },
//   }).populate('participants.user');

//   conv.blocked = !conv.blocked;
//   conv.save();

//   res.json(conv);
// });

// query parameter saved from the BE?

export default conversation;
