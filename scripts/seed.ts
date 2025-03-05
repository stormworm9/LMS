const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    const categories = [
      {
        name: "IT & Software",
        subCategories: [
          { name: "Web Development" },
          { name: "Data Science" },
          { name: "Cybersecurity" },
          { name: "Others" },
        ],
      },
      {
        name: "Business",
        subCategories: [
          { name: "E-Commerce" },
          { name: "Marketing" },
          { name: "Finance" },
          { name: "Others" },
        ],
      },
      {
        name: "Design",
        subCategories: [
          { name: "Graphic Design" },
          { name: "3D & Animation" },
          { name: "Interior Design" },
          { name: "Others" },
        ],
      },
      {
        name: "Health",
        subCategories: [
          { name: "Fitness" },
          { name: "Yoga" },
          { name: "Nutrition" },
          { name: "Others" },
        ],
      },
    ];

    // Use upsert to create or update categories
    for (const category of categories) {
      await database.category.upsert({
        where: { name: category.name },
        update: {},
        create: {
          name: category.name,
          subCategories: {
            create: category.subCategories.map(subCat => ({ 
              name: subCat.name 
            }))
          },
        },
        include: {
          subCategories: true,
        },
      });
    }

    // Use createMany with onConflict for levels
    await database.level.createMany({
      data: [
        { name: "Beginner" },
        { name: "Intermediate" },
        { name: "Expert" },
        { name: "All levels" },
      ],
      skipDuplicates: true, // This will skip levels that already exist
    });

    console.log("Seeding successfully completed");
  } catch (error) {
    console.error("Seeding failed", error);
  } finally {
    await database.$disconnect();
  }
}

main();