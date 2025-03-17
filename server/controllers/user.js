import { Router } from 'express';
import User from '../models/User.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const user = Router();

user.get('', async (req, res) => {
  const userData = await User.findById(res.locals.user.id);
  res.json(userData);
});

user.get('/:id', async (req, res) => {
  const userData = await User.findById(req.params.id);
  res.json(userData);
});

user.patch('/:id', upload.single('file'), async (req, res) => {
  const { file, ...neededData } = req.body;
  let data;
  if (req?.file?.path) {
    data = { ...neededData, image: req?.file.path };
  } else {
    data = { ...neededData };
  }
  const userData = await User.findByIdAndUpdate(req.params.id, { $set: data }, { returnOriginal: false });
  res.json(userData);
});

user.post('/upload', upload.single('file'), async (req, res) => {
  const userData = await User.findByIdAndUpdate(
    res.locals.user.id,
    { image: req?.file.path },
    { returnOriginal: false }
  );
  res.json(userData);
});

user.get('/search/:key', upload.single('file'), async (req, res) => {
  const regex = new RegExp(req.params.key, 'i');
  const userData = await User.find({ username: { $regex: regex } });
  res.json(userData);
});

export default user;
