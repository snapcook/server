const { Router } = require('express');
const CategoryRouter = require('./category');

const router = Router();

router.get('/', (req, res) => {
  res.send('⚡️ Server is running!');
});

router.use(CategoryRouter);

module.exports = router;
