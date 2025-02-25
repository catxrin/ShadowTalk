import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Username is required'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be 8 or more characters'],
  },
});

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', UserSchema);
export default User;
