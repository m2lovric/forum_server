import express from 'express';
import { getData } from './database/queries';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  const data = await getData();
  console.log(data[0]);
  res.json({ status: 'Welcome' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
