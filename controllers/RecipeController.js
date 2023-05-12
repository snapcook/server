const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');
const { nanoid } = require('nanoid');

const prisma = new PrismaClient();

class RecipeController {
  static async list(req, res) {
    const authorId = req.query.authorId;

    if (authorId) {
      const result = await prisma.recipe.findMany({
        where: { authorId },
      });
      res.status(200).json(result);
    } else {
      const result = await prisma.recipe.findMany({});
      res.status(200).json(result);
    }
  }

  static async show(req, res) {
    const result = await prisma.recipe.findUnique({
      where: { id: req.params.id },
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  }

  static async store(req, res, next) {
    try {
      const { title, slug, ...body } = req.body;

      const result = await prisma.recipe.create({
        data: {
          title: title,
          slug: `${slugify(title, { lower: true })}-${nanoid(6)}`,
          ...body,
        },
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { ...body } = req.body;

      const result = await prisma.recipe.update({
        where: {
          id: req.params.id,
        },
        data: { ...body },
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
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
