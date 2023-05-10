const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');

const { decodeHash, generateHash } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

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

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        const isPasswordValid = decodeHash(password, user.password);

        if (isPasswordValid) {
          return res.status(200).json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token: generateToken({
              name: user.name,
              email: user.email,
              contact: user.contact,
              role: user.role,
            }),
          });
        } else {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        return res.status(404).json({ message: 'User not registered' });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
