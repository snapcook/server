const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');

const { generateHash } = require('../helpers/bcrypt');

async function load() {
  try {
    const name = 'Snapcook Admin';
    const adminData = await prisma.user.create({
      data: {
        email: 'snapcookadmin@gmail.com',
        name: name,
        password: generateHash('snapcookadmin2023'),
        slug: slugify(name, { lower: true }),
        photo: '',
        role: 'ADMIN',
      },
    });

    if (adminData) {
      console.log('Seeding succes');
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

load();
