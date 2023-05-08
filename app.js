const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('⚡️ Server is running!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
