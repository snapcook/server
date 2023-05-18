const { PrismaClient, Prisma } = require('@prisma/client');
const slugify = require('slugify');
const { nanoid } = require('nanoid');

const { handlePrismaError } = require('../validators/PrismaValidator');

const prisma = new PrismaClient();

class RecipeController {
  static async list(req, res) {
    const query = req.query;

    const result = await prisma.recipe.findMany({
      where: {
        authorId: query.authorId,
        title: {
          search: query.search?.split(' ').join(' | '),
        },
        mainCategory: query.mainCategory,
        secondCategoryId: query.secondCategory,
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

  static async show(req, res) {
    const result = await prisma.recipe.findUnique({
      where: { slug: req.params.slug },
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

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  }

  static async store(req, res) {
    try {
      const {
        title,
        slug,
        totalServing,
        estimatedTime,
        mainIngredients,
        ...body
      } = req.body;

      if (req.file) {
        const result = await prisma.recipe.create({
          data: {
            title: title,
            slug: `${slugify(title, { lower: true })}-${nanoid(6)}`,
            totalServing: Number(totalServing),
            estimatedTime: Number(estimatedTime),
            mainIngredients: mainIngredients,
            searchMainIngredients: mainIngredients.join(' '),
            ...body,
          },
        });
        const { searchMainIngredients, ...recipe } = result;
        res.status(201).json(recipe);
      } else {
        return res.status(400).json({ message: 'Please upload a photo' });
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async update(req, res) {
    try {
      const { photo, totalServing, estimatedTime, mainIngredients, ...body } =
        req.body;

      const result = await prisma.recipe.update({
        where: {
          id: req.params.id,
        },
        data: {
          photo: req.file ? photo : undefined,
          totalServing: Number(totalServing),
          estimatedTime: Number(estimatedTime),
          mainIngredients: mainIngredients,
          searchMainIngredients: mainIngredients.join(' '),
          ...body,
        },
      });
      const { searchMainIngredients, ...recipe } = result;
      res.status(201).json(recipe);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async destroy(req, res, next) {
    try {
      await prisma.recipe.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: 'Delete success' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RecipeController;
