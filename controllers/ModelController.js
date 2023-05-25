const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const listMainIngridient = [
  {
    name: 'Tempe',
    tags: 'Tempe',
  },
  {
    name: 'Daging Sapi',
    tags: 'Daging sapi',
  },
  {
    name: 'Wortel',
    tags: 'carrot',
  },
  {
    name: 'Apel',
    tags: 'apple',
  },
  {
    name: 'Pisang',
    tags: 'banana',
  },
  {
    name: 'Jeruk',
    tags: 'orange',
  },
  {
    name: 'Telur',
    tags: 'egg',
  },
  {
    name: 'Kentang',
    tags: 'potato',
  },
  {
    name: 'Ayam',
    tags: 'chicken',
  },
  {
    name: 'Kubis',
    tags: 'cabbage',
  },
];

class ModelController {
  static async predict(req, res, next) {
    const { mainIngredients } = req.body;

    const currentMainIngredients = [];

    mainIngredients.forEach((ingredient) => {
      listMainIngridient.forEach((data) => {
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
