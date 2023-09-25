import express from 'express';
import { subforumsRoute, userRoute, postsRoute } from './routes/routes';

const app = express();
const PORT = 3000;

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
app.use('/api', postsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
