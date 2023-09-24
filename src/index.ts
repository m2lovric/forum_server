import express from 'express';
import { subforumsRoute } from './routes/subforumRoute';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.json({ status: 'Welcome' });
});

app.use('/', subforumsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
