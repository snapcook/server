const { PrismaClient, Prisma } = require('@prisma/client');

const { handlePrismaError } = require('../validators/PrismaValidator');

const prisma = new PrismaClient();

class NoteController {
  static async list(req, res) {
    const loggedUser = req.loggedUser;

    const result = await prisma.shoppingNote.findMany({
      where: { authorId: loggedUser.id },
    });
    res.status(200).json(result);
  }

  static async show(req, res) {
    const result = await prisma.shoppingNote.findUnique({
      where: { id: req.params.id },
    });

    if (result === null) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      res.status(200).json(result);
    }
  }

  static async store(req, res) {
    const { ...body } = req.body;

    try {
      const result = await prisma.shoppingNote.create({
        data: { ...body },
      });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async update(req, res) {
    const { ...body } = req.body;

    try {
      const result = await prisma.shoppingNote.update({
        where: {
          id: req.params.id,
        },
        data: { ...body },
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
      await prisma.shoppingNote.delete({
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

module.exports = NoteController;
