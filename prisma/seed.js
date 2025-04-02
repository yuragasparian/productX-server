import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: "john_doe",
      password: "hashedpassword123",
      user_image: "https://example.com/user1.jpg",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "jane_smith",
      password: "hashedpassword456",
      user_image: "https://example.com/user2.jpg",
    },
  });

  // Create Categories
  const category1 = await prisma.category.create({
    data: {
      id: 1,
      name: "Electronics",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      id: 2,
      name: "Clothing",
    },
  });

  // Create Products
  const product1 = await prisma.products.create({
    data: {
      name: "Smartphone",
      sku: 1001,
      description: "A high-end smartphone with a great camera",
      price: 999,
      stock_quantity: 50,
      product_image: "https://example.com/smartphone.jpg",
      category_id: category1.id,
      adder_id: user1.id,
    },
  });

  const product2 = await prisma.products.create({
    data: {
      name: "T-Shirt",
      sku: 2001,
      description: "Comfortable cotton T-Shirt",
      price: 29,
      stock_quantity: 200,
      product_image: "https://example.com/tshirt.jpg",
      category_id: category2.id,
      adder_id: user2.id,
    },
  });

  // Add Product History Entries
  await prisma.productHistory.create({
    data: {
      product_id: product1.id,
      change_made: "Initial product entry.",
    },
  });

  await prisma.productHistory.create({
    data: {
      product_id: product2.id,
      change_made: "Added first stock.",
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

