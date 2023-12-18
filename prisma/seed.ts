import { Categories, Colors, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const testUser = await prisma.user.create({
    data: {
      email: `testemail@gmail.com`,
      userName: `vintageLover`,
      password: `testpassword`,
    },
  });

  const testJacket = await prisma.piece.create({
    data: {
      title: `Bomber Suede Jacket`,
      description: `Real suede bomber jacket with high collar. The jacket is in great condition, with no stains or tears. The jacket is a size medium, but fits more like a small in Canada`,
      colors: Colors.BROWN,
      category: Categories.JACKET,
      price: 500,
      location: `Banana Republic at Robson`,
      user: { connect: { id: testUser.id } },
    },
  });

  const testPants = await prisma.piece.create({
    data: {
      title: 'Grey dress wool pants',
      description: 'Grey dress wool pants, size 30 waist, 30 length. In great condition, no stains or tears.',
      colors: Colors.GREY,
      category: Categories.DRESSPANTS,
      price: 100,
      location: 'Beauty & Youth in Osaka',
      user: { connect: { id: testUser.id } },
    },
  });

  await prisma.dendoOutfit.create({
    data: {
      title: 'Dendo Outfit',
      keywords: ['fall', 'winter', 'dress', 'manly', 'european'],
      user: { connect: { id: testUser.id } },
      pieces: {
        connect: [{ id: testJacket.id }, { id: testPants.id }],
      },
    },
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
