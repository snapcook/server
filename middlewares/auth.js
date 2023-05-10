const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { decodeToken } = require('../helpers/jwt');

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

async function userAuthorization(req, res, next) {
  const loggedUser = req.loggedUser;

  if (loggedUser) {
    // Define the data cannot accesed by other users
    const shoppingNoteId = req.params.id;

    const findNote = await prisma.bookmarks.findUnique({
      where: {
        id: shoppingNoteId,
      },
    });

    const validUser = loggedUser.id === findNote.authorId;

    if (validUser) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden access' });
    }
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

module.exports = { authentication, userAuthorization, adminAuthorization };
