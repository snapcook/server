const { PrismaClient } = require('@prisma/client');
const { decodeToken } = require('../helpers/jwt');

const prisma = new PrismaClient();

function authentication(req, res, next) {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split(' ')[1];
    req.loggedUser = decodeToken(token);
    next();
  } else {
    res.status(400).json({ message: 'Invalid auth' });
  }
}

function adminAuthorization(req, res, next) {
  const loggedUser = req.loggedUser;

  if (loggedUser.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden access' });
  }
}

async function userAuthorization(req, res, next) {
  const loggedUser = req.loggedUser;

  if (loggedUser) {
    const userId = req.params.id;
    const findUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const validUser = loggedUser.id === findUser.id;

    if (validUser) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden access' });
    }
  } else {
    res.status(400).json({ message: 'Invalid auth' });
  }
}

async function recipeAuthorization(req, res, next) {
  const loggedUser = req.loggedUser;

  if (loggedUser) {
    const recipeId = req.params.id;
    const findRecipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    const validUser = loggedUser.id === findRecipe.authorId;

    if (validUser) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden access' });
    }
  } else {
    res.status(400).json({ message: 'Invalid auth' });
  }
}

module.exports = {
  authentication,
  userAuthorization,
  adminAuthorization,
  recipeAuthorization,
};
