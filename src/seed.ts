import { Seller, Transaction } from "./models";
import { sequelize } from "./config/database";

async function seedData() {
  try {
    await sequelize.sync({ force: true });

    const seller = await Seller.create({ name: "Test Seller" });

    await Transaction.bulkCreate([
      {
        title: "Product 1",
        image:
          "https://th.bing.com/th/id/OIP.CIac5BAbYhrvBddLTcoNxAHaEW?w=290&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        price: 100000.0,
        last_updated: new Date(),
        seller_id: seller.id,
      },
      {
        title: "Product 2",
        image:
          "https://th.bing.com/th/id/OIP.CIac5BAbYhrvBddLTcoNxAHaEW?w=290&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        price: 150000.0,
        last_updated: new Date(),
        seller_id: seller.id,
      },
    ]);

    console.log("Data seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("Failed to seed data:", error);
    process.exit(1);
  }
}

seedData();
