const storage = require('../config/storage');
const { nanoid } = require('nanoid');

function imageUpload(req, res, next) {
  try {
    const file = req.file;
    const user = req.loggedUser;
    const bucket = storage.bucket('snapcook-dev-storage');

    let imagePath = '';

    if (req.route.path === '/recipe') {
      imagePath = `images/recipe/${user.id}_${nanoid(8)}_${file.originalname}`;
    } else if (req.route.path === '/user') {
      imagePath = `images/user/${user.id}_${nanoid(8)}_${file.originalname}`;
    }

    bucket.file(imagePath).save(file.buffer);
    req.body.photo = bucket.file(imagePath).publicUrl();
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { imageUpload };
