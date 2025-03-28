import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import routes from './routes.js';
import { isAuth } from './middlewares/auth.js';

dotenv.config({ path: './../.env' });

// Connecting to the database
try {
  await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
  console.log('Connected to DB');
} catch (error) {
  console.error(error.message);
}

// Express Configurations
const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(isAuth);

app.use(routes);

app.listen(process.env.PORT, () => console.log(`🍵 Server is listening on http://localhost:${process.env.PORT}`));
