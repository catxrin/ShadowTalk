import { Router } from 'express';
import { Conversation } from '../models/Conversation.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

const conversation = Router();

conversation.get('/:id', async (req, res) => {
  // go through this again, can i make it shorter?
  const conv = await Conversation.aggregate([
    {
      $match: {
        'participants.user': {
          $all: [new mongoose.Types.ObjectId(res.locals.user.id), new mongoose.Types.ObjectId(req.params.id)],
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'participants.user',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    {
      $lookup: {
        from: 'messages',
        let: { messageIds: '$messages' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$_id', '$$messageIds'],
              },
            },
          },
          {
            $sort: { createdAt: 1 },
          },
        ],
        as: 'messages',
      },
    },
    {
      $project: {
        messages: 1,
        participants: 1,
        userDetails: {
          $map: {
            input: '$userDetails',
            as: 'u',
            in: {
              _id: '$$u._id',
              username: '$$u.username',
              image: '$$u.image',
            },
          },
        },
      },
    },

    {
      $addFields: {
        participants: {
          $map: {
            input: '$participants',
            as: 'p',
            in: {
              $mergeObjects: [
                '$$p',
                {
                  $first: {
                    $filter: {
                      input: '$userDetails',
                      as: 'u',
                      cond: {
                        $eq: ['$$u._id', '$$p.user'],
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        'participants.user': 0,
        userDetails: 0,
      },
    },
    {
      $sort: {
        'messages.createdAt': -1,
      },
    },
  ]);

  if (conv[0]) {
    return res.json(conv[0]);
  }

  const user = await User.findById(res.locals.user.id).select('-password -email');
  const partner = await User.findById(req.params.id).select('-password -email');

  const chat = { participants: [user, partner] };

  res.json(chat);
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
  participant.accent = req.body?.theme;

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
