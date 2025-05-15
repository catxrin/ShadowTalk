import { Conversation } from '../models/Conversation.js';

export const getAll = async userId => {
  return await Conversation.find({
    participants: { $elemMatch: { user: userId } },
  });
};

export const findConversation = async (userId, partnerId) => {
  const conversation = await Conversation.findOne({
    participants: {
      $all: [{ $elemMatch: { user: userId } }, { $elemMatch: { user: partnerId } }],
    },
  });

  return conversation;
};
