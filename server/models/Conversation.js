import mongoose, { model, Schema } from 'mongoose';

const ConversationSchema = new Schema(
  {
    participants: [
      {
        nickname: String,
        theme: {
          type: String,
          default: 'Default',
        },
        accent: {
          type: String,
          default: 'Default',
        },
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
