import { Conversation } from '../models/Conversation.js';

export const getAll = async userId => {
  const conversation = await Conversation.find({
    participants: { $elemMatch: { user: userId } },
  })
    .populate('participants.user')
    .sort({ updatedAt: -1 });
  return conversation;
};

export const findConversation = async (userId, partnerId) => {
  const conversation = await Conversation.findOne({
    participants: {
      $all: [{ $elemMatch: { user: userId } }, { $elemMatch: { user: partnerId } }],
    },
  });

  return conversation;
};
