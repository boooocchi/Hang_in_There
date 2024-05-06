import { Categories, Colors, PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('testPassword', 10);

  const testUser = await prisma.user.create({
    data: {
      email: `test@gmail.com`,
      userName: `vintageLover`,
      password: hashedPassword,
    },
  });

  const testJacket = await prisma.piece.create({
    data: {
      itemName: `Bomber Suede Jacket`,
      description: `Real suede bomber jacket with high collar. The jacket is in great condition, with no stains or tears. The jacket is a size medium, but fits more like a small in Canada`,
      color: Colors.BROWN,
      category: Categories.OUTERWEAR,
      price: 500,
      brand: `Banana Republic at Robson`,
      imageUrl: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/testJacket.webp`,
      user: { connect: { id: testUser.id } },
    },
  });

  const testPants = await prisma.piece.create({
    data: {
      itemName: 'Grey dress wool pants',
      description: 'Grey dress wool pants, size 30 waist, 30 length. In great condition, no stains or tears.',
      color: Colors.GRAY,
      category: Categories.BOTTOMS,
      price: 100,
      brand: 'Beauty & Youth in Osaka',
      imageUrl: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/testPants.webp`,
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

  await prisma.limitEntry.createMany({
    data: [
      { category: Categories.SHOES, value: 10, userId: testUser.id },
      { category: Categories.OUTERWEAR, value: 10, userId: testUser.id },
      { category: Categories.LIGHTTOPS, value: 20, userId: testUser.id },
      { category: Categories.HEAVYTOPS, value: 20, userId: testUser.id },
      { category: Categories.BOTTOMS, value: 30, userId: testUser.id },
      { category: Categories.ACCESSORIES, value: 20, userId: testUser.id },
    ],
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
