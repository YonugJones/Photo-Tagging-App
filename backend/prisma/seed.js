const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.character.createMany({
    data: [
      { name: 'Waldo', x: 629, y: 169 },
      { name: 'Wanda', x: 618, y: 348 },
      { name: 'Wizard', x: 744, y: 483 }
    ]
  })

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });