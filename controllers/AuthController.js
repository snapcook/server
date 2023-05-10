const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');

const { decodeHash, generateHash } = require('../helpers/bcrypt');

class AuthController {
  static async register(req, res, next) {
    const hashedPassword = generateHash(req.body.password);

    try {
      const result = await prisma.user.create({
        data: {
          email: req.body.email,
          name: req.body.name,
          password: hashedPassword,
          slug: slugify(req.body.name, { lower: true }),
          photo: req.body.photo,
        },
      });

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res) {}
}

module.exports = AuthController;
