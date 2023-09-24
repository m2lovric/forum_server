import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'Welcome' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
