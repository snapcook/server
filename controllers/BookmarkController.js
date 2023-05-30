const { PrismaClient, Prisma } = require('@prisma/client');

const { handlePrismaError } = require('../validators/PrismaValidator');

const prisma = new PrismaClient();

class BookmarkController {
  static async list(req, res) {
    const authorId = req.params.id;

    const result = await prisma.bookmarks.findMany({
      where: { authorId },
      include: {
        recipe: {
          include: {
            author: {
              select: {
                name: true,
                photo: true,
                slug: true,
              },
            },
            secondCategory: {
              select: {
                id: true,
                name: true,
                photo: true,
              },
            },
            utensils: {
              select: {
                utensil: {
                  select: {
                    id: true,
                    name: true,
                    photo: true,
                  },
                },
              },
            },
            _count: {
              select: { bookmarks: true },
            },
          },
        },
      },
    });

    const bookmark = result.map((data) => {
      data.recipe.totalBookmark = data.recipe._count.bookmarks;

      const utensils = data.recipe.utensils.map((item) => {
        return item.utensil;
      });
      data.recipe.utensils = utensils;

      const { _count, searchIngredients, ...restRecipe } = data.recipe;
      data.recipe = restRecipe;

      return data;
    });

    res.status(200).json(bookmark);
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
    const recipeId = req.params.recipeId;
    const authorId = req.loggedUser.id;

    try {
      const bookmark = await prisma.bookmarks.findFirst({
        where: {
          AND: [{ recipeId }, { authorId }],
        },
      });

      if (bookmark) {
        await prisma.bookmarks.delete({
          where: { id: bookmark.id },
        });
        res.status(200).json({ message: 'Bookmark deleted' });
      } else {
        res.status(400).json({ message: 'Data not found' });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookmarkController;
