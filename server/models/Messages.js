import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const MessageSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = model('Message', MessageSchema);
