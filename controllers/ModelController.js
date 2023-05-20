const { PrismaClient } = require('@prisma/client');
const tf = require('@tensorflow/tfjs-node');
const path = require('path');

const checkLabel = require('../config/model');

const prisma = new PrismaClient();

// Load the saved_model
const modelPath = path.resolve('./model/content/saved_model');
let model;

(async () => {
  model = await tf.node.loadSavedModel(modelPath);
})();

class ModelController {
  static async predict(req, res, next) {
    const file = req.file;
    console.log(model);

    const IMG_SIZE = [512, 512];

    // Check file type
    if (file) {
      let pattern = /image\/(jpeg|png|jpg)/;
      if (!pattern.test(file.mimetype)) {
        throw new Error('File type not supported');
      }

      const result = tf.tidy(() => {
        // Load the image from a file and make it a tensor.
        const tfimage = tf.node.decodeImage(file.buffer);
        const tfexapand = tfimage.resizeBilinear(IMG_SIZE).expandDims(0);
        const prediction = model.predict(tfexapand);

        let predictionData = [];
        prediction.forEach((element) => {
          predictionData.push(element.dataSync());
        });

        const labelsSource = checkLabel();
        const labels = labelsSource.label.sort();

        const predictionResult = predictionData.map((val, index) => {
          return {
            label: labels?.[index],
            value: val,
          };
        });
        return predictionResult;
      });
      res.status(200).json(result);
    }

    // This data will gathered from model
    // let ingredients = 'Jeruk';
    // const result = await prisma.recipe.findMany({
    //   where: {
    //     searchMainIngredients: {
    //       search: ingredients.split(' ').join(' | '),
    //     },
    //   },
    //   include: {
    //     author: {
    //       select: {
    //         name: true,
    //         photo: true,
    //         slug: true,
    //       },
    //     },
    //   },
    // });
    // res.status(200).json(result);
  }
}

module.exports = ModelController;
