const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class ModelController {
  static async predict(req, res) {
    // This data will gathered from model
    let ingredients = 'Jeruk';

    const result = await prisma.recipe.findMany({
      where: {
        searchMainIngredients: {
          search: ingredients.split(' ').join(' | '),
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

    res.status(200).json(result);
  }
}

module.exports = ModelController;
