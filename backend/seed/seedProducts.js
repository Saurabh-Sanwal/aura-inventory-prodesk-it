require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Product = require("../models/Product");

const CATEGORIES = ["Electronics", "Apparel", "Home & Kitchen", "Furniture", "Sports & Fitness", "Toys", "Groceries"];
const TOTAL_PRODUCTS = 150;
const BATCH_SIZE = 150;
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB. Clearing old products...");
    await Product.deleteMany({});

    console.log(`Generating ${TOTAL_PRODUCTS} fake products...`);

    for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {
      const batch = [];

      for (let j = 0; j < BATCH_SIZE; j++) {
        const cost = parseFloat(faker.commerce.price({ min: 5, max: 300 }));
        const price = parseFloat((cost * (1 + Math.random() * 0.6)).toFixed(2));

        batch.push({
          productName: faker.commerce.productName(),
          sku: faker.string.alphanumeric(10).toUpperCase() + i + j,
          category: faker.helpers.arrayElement(CATEGORIES),
          price,
          cost,
          stockQuantity: faker.number.int({ min: 0, max: 500 }),
          reorderLevel: 20,
        });
      }

      await Product.insertMany(batch);
      console.log(`Inserted ${i + BATCH_SIZE} / ${TOTAL_PRODUCTS}`);
    }

    console.log("Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
