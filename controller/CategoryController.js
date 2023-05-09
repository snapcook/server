const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');

class CategoryController {
  static async getCategory(req, res) {
    console.log('masuk sini');
    const result = await prisma.recipeCategory.findMany({});
    res.status(200).json(result);
  }

  static async getDetailCategory(req, res) {
    const result = await prisma.recipeCategory.findUnique({
      where: { id: req.params.id },
    });

    if (result === null) {
      res.status(404).json({ msg: 'Data not found' });
    } else {
      res.status(200).json(result);
    }
  }

  static async addCategory(req, res) {
    const result = await prisma.recipeCategory.create({
      data: {
        name: req.body.name,
        slug: slugify(req.body.name, { lower: true }),
      },
    });
    res.status(201).json(result);
  }

  static async editCategory(req, res) {
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
  }

  static async deleteCategory(req, res) {
    const result = await prisma.recipeCategory.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(result);
  }
}

module.exports = CategoryController;
