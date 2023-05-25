const { PrismaClient, Prisma } = require('@prisma/client');

const { handlePrismaError } = require('../validators/PrismaValidator');

const prisma = new PrismaClient();

class UtensilController {
  static async list(req, res) {
    const result = await prisma.utensil.findMany({});
    res.status(200).json(result);
  }

  static async show(req, res) {
    const result = await prisma.utensil.findUnique({
      where: { id: req.params.id },
    });

    if (result === null) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      res.status(200).json(result);
    }
  }

  static async store(req, res) {
    const { name, photo } = req.body;

    try {
      const result = await prisma.utensil.create({
        data: { name, photo },
      });
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async update(req, res) {
    const { name, photo } = req.body;

    try {
      const result = await prisma.utensil.update({
        where: {
          id: req.params.id,
        },
        data: {
          name,
          photo: req.file ? photo : undefined,
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
      await prisma.utensil.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: 'Delete success' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }
}

module.exports = UtensilController;
