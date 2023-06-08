const storage = require('../config/storage');
const { nanoid } = require('nanoid');

function imageUpload(req, res, next) {
  const bucketName = process.env.BUCKETNAME;

  try {
    const file = req.file;
    const user = req.loggedUser;
    const bucket = storage.bucket(bucketName);

    if (file) {
      let imagePath = '';
      let routePath = req.route.path;

      if (routePath === '/recipe' || routePath === '/recipe/:id') {
        imagePath = `images/recipe/${user.id}_${nanoid(8)}_${
          file.originalname
        }`;
      } else if (routePath === '/category' || routePath === '/category/:id') {
        imagePath = `images/category/${user.id}_${nanoid(8)}_${
          file.originalname
        }`;
      } else if (routePath === '/utensil' || routePath === '/utensil/:id') {
        imagePath = `images/utensil/${user.id}_${nanoid(8)}_${
          file.originalname
        }`;
      } else if (routePath === '/user/:id') {
        imagePath = `images/user/${user.id}_${nanoid(8)}_${file.originalname}`;
      }

      bucket.file(imagePath).save(file.buffer);
      req.body.photo = bucket.file(imagePath).publicUrl();
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { imageUpload };
