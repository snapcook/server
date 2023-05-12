const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');

const prisma = new PrismaClient();

class UserController {
  static async list(req, res) {
    const result = await prisma.user.findMany({});

    const user = result.map((data) => {
      const { password, ...rest } = data;
      return rest;
    });

    res.status(200).json(user);
  }

  static async show(req, res) {
    const result = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (result) {
      const { password, ...user } = result;
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Data not found' });
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
      if (result) {
        const { password, ...user } = result;
        res.status(200).json(user);
      }
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
