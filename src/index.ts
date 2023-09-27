import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { subforumsRoute, userRoute, postsRoute } from './routes/routes';
import { getCookie, jwtAuth } from './middleware/jwtAuth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ['Authorization'],
  })
);

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${res.statusCode} ${req.baseUrl}${req.url}`);
  });
  next();
});

app.get('/', async (req, res) => {
  res.json({ status: 'Welcome' });
});

app.use('/api', subforumsRoute);
app.use('/api', userRoute);
app.use('/api', getCookie, postsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
