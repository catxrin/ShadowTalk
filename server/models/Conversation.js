import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const ConversationSchema = new Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  messages: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    default: [],
    select: false,
  },
});

export const Conversation = model('Conversation', ConversationSchema);
