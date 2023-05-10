const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');

class UserController {
  static async list(req, res) {
    const result = await prisma.user.findMany({});
    res.status(200).json(result);
  }

  static async show(req, res) {
    const result = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (result === null) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      res.status(200).json(result);
    }
  }

  static async update(req, res, next) {
    try {
      const result = await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name,
          slug: slugify(req.body.name, { lower: true }),
          photo: req.body.photo,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      await prisma.user.delete({
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

module.exports = UserController;
