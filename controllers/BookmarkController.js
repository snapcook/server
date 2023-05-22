const { PrismaClient, Prisma } = require('@prisma/client');

const { handlePrismaError } = require('../validators/PrismaValidator');

const prisma = new PrismaClient();

class BookmarkController {
  static async list(req, res) {
    const authorId = req.params.id;

    const result = await prisma.bookmarks.findMany({
      where: { authorId },
      include: {
        recipe: true,
      },
    });
    res.status(200).json(result);
  }

  static async store(req, res) {
    const { authorId, recipeId } = req.body;

    const availableBookmark = await prisma.bookmarks.findFirst({
      where: {
        AND: [{ recipeId }, { authorId }],
      },
    });

    if (availableBookmark !== null) {
      res.status(200).json({ message: 'Already bookmarked' });
    } else {
      try {
        const result = await prisma.bookmarks.create({
          data: { authorId, recipeId },
        });
        res.status(201).json(result);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          handlePrismaError(res, error);
        }
      }
    }
  }

  static async destroy(req, res, next) {
    try {
      await prisma.bookmarks.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: 'Bookmark deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookmarkController;
