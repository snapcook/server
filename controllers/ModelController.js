const { PrismaClient } = require('@prisma/client');

const modelLabels = require('../config/label');

const prisma = new PrismaClient();

class ModelController {
  static async predict(req, res) {
    const { mainIngredients } = req.body;

    const currentMainIngredients = [];

    mainIngredients.forEach((ingredient) => {
      modelLabels.forEach((data) => {
        if (ingredient === data.tags) {
          currentMainIngredients.push(data.name);
        }
      });
    });

    const joinMainIngredients = currentMainIngredients.join(' ');
    const result = await prisma.recipe.findMany({
      where: {
        searchMainIngredients: {
          search: joinMainIngredients?.split(' ').join(' | '),
        },
      },
      include: {
        author: {
          select: {
            name: true,
            photo: true,
            slug: true,
          },
        },
      },
    });

    const recipe = result.map((data) => {
      const { searchMainIngredients, ...rest } = data;
      return rest;
    });

    res.status(200).json(recipe);
  }
}

module.exports = ModelController;
