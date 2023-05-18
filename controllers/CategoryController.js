const { PrismaClient, Prisma } = require('@prisma/client');
const slugify = require('slugify');

const { handlePrismaError } = require('../validators/PrismaValidator');

const prisma = new PrismaClient();

class CategoryController {
  static async list(req, res) {
    const result = await prisma.recipeCategory.findMany({});
    res.status(200).json(result);
  }

  static async show(req, res) {
    const result = await prisma.recipeCategory.findUnique({
      where: { id: req.params.id },
    });

    if (result === null) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      res.status(200).json(result);
    }
  }

  static async store(req, res) {
    const { name } = req.body;

    try {
      const result = await prisma.recipeCategory.create({
        data: {
          name: name,
          slug: slugify(name, { lower: true }),
        },
      });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async update(req, res) {
    try {
      const result = await prisma.recipeCategory.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name,
          slug: slugify(req.body.name, { lower: true }),
        },
      });
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async destroy(req, res, next) {
    try {
      await prisma.recipeCategory.delete({
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

module.exports = CategoryController;
