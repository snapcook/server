const { PrismaClient, Prisma } = require('@prisma/client');
const slugify = require('slugify');

const prisma = new PrismaClient();

const { decodeHash, generateHash } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { handlePrismaError } = require('../validators/PrismaValidator');

class AuthController {
  static async register(req, res) {
    try {
      const result = await prisma.user.create({
        data: {
          email: req.body.email,
          name: req.body.name,
          password: generateHash(req.body.password),
          slug: slugify(req.body.name, { lower: true }),
          photo: '',
        },
      });
      const { password, ...user } = result;
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async login(req, res) {
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
              id: user.id,
              name: user.name,
              email: user.email,
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
      handlePrismaError(res, error);
    }
  }

  static async logout(req, res) {
    const authorization = req.headers.authorization;

    if (authorization !== '') {
      req.headers.authorization = undefined;
      return res.status(401).json({ message: 'Logged Out' });
    }
  }
}

module.exports = AuthController;
