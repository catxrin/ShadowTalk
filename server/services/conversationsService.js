import { Conversation } from '../models/Conversation.js';

export const getAll = async userId => {
  return await Conversation.find({
    participants: { $elemMatch: { user: userId } },
  });
};
