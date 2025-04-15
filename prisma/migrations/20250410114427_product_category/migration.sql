/*
  Warnings:

  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `Products_category_id_fkey`;

-- DropIndex
DROP INDEX `Products_category_id_fkey` ON `products`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `category_id`,
    ADD COLUMN `category` ENUM('Electronics', 'Clothing', 'Home_Appliances', 'Books', 'Beauty', 'Sports', 'Food', 'Furniture', 'Toys', 'Automotive') NOT NULL;

-- DropTable
DROP TABLE `category`;
