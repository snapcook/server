const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get('/', (req, res) => {
  res.send('⚡️ Server is running!');
});

app.listen(3000, () => {
  console.log(`Server running at https://localhost:${port}`);
});
