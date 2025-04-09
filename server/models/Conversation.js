import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const ConversationSchema = new Schema(
  {
    participants: [
      {
        nickname: String,
        theme: {
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

ConversationSchema.pre('save', async function (next) {
  for (let participant of this.participants) {
    if (!participant.nickname) {
      const user = await mongoose.model('User').findById(participant.user);
      if (user) {
        participant.nickname = user.username;
      }
    }
  }
  next();
});

export const Conversation = model('Conversation', ConversationSchema);
