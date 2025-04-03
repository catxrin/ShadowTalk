import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const ConversationSchema = new Schema(
  {
    participants: [
      {
        nickname: String,
        blocked: {
          type: Boolean,
          default: false,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
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
    saved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Conversation = model('Conversation', ConversationSchema);
