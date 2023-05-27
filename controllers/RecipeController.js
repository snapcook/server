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
    });

    const recipe = result.map((data) => {
      data.totalBookmark = data._count.bookmarks;

      const utensils = data.utensils.map((item) => {
        return item.utensil;
      });
      data.utensils = utensils;

      const { searchIngredients, _count, ...rest } = data;
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
    });

    if (result) {
      result.totalBookmark = result._count.bookmarks;

      const utensils = result.utensils.map((item) => {
        return item.utensil;
      });
      result.utensils = utensils;

      const { searchIngredients, _count, ...recipe } = result;
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  }

  static async store(req, res) {
    const {
      title,
      slug,
      totalServing,
      estimatedTime,
      mainIngredients,
      utensils,
      ...body
    } = req.body;

    try {
      const utensilData = [];
      utensils.forEach((id) => {
        utensilData.push({
          assignedBy: req.loggedUser.id,
          utensil: { connect: { id } },
        });
      });

      if (req.file) {
        const result = await prisma.recipe.create({
          data: {
            title: title,
            slug: `${slugify(title, { lower: true })}-${nanoid(6)}`,
            totalServing: Number(totalServing),
            estimatedTime: Number(estimatedTime),
            mainIngredients: mainIngredients,
            searchIngredients: mainIngredients.join(' '),
            utensils: {
              create: utensilData,
            },
            ...body,
          },
        });
        const { searchIngredients, ...recipe } = result;
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
    const {
      photo,
      totalServing,
      estimatedTime,
      mainIngredients,
      utensils,
      ...body
    } = req.body;

    try {
      const utensilData = [];
      utensils.forEach((id) => {
        utensilData.push({
          assignedBy: req.loggedUser.id,
          recipeId: req.params.id,
          utensilId: id,
        });
      });

      const result = await prisma.recipe.update({
        where: {
          id: req.params.id,
        },
        data: {
          photo: req.file ? photo : undefined,
          totalServing: Number(totalServing),
          estimatedTime: Number(estimatedTime),
          mainIngredients: mainIngredients,
          searchIngredients: mainIngredients.join(' '),
          utensils: { deleteMany: {} },
          ...body,
        },
      });

      await prisma.recipeUtensil.createMany({
        data: utensilData,
      });

      const { searchIngredients, ...recipe } = result;
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
