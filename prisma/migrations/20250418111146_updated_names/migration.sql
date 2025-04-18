/*
  Warnings:

  - You are about to drop the column `change_made` on the `producthistory` table. All the data in the column will be lost.
  - You are about to drop the column `change_time` on the `producthistory` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `producthistory` table. All the data in the column will be lost.
  - You are about to drop the column `user_image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `changeDescription` to the `ProductHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `producthistory` DROP FOREIGN KEY `ProductHistory_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `Products_adder_id_fkey`;

-- DropIndex
DROP INDEX `ProductHistory_product_id_fkey` ON `producthistory`;

-- DropIndex
DROP INDEX `User_username_key` ON `user`;

-- AlterTable
ALTER TABLE `producthistory` DROP COLUMN `change_made`,
    DROP COLUMN `change_time`,
    DROP COLUMN `product_id`,
    ADD COLUMN `changeDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `changedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `productId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `user_image`,
    DROP COLUMN `username`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `products`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sku` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `price` INTEGER NOT NULL,
    `stockQuantity` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `creatorId` INTEGER NOT NULL,
    `category` ENUM('Electronics', 'Clothing', 'HomeAppliances', 'Books', 'Beauty', 'Sports', 'Food', 'Furniture', 'Toys', 'Automotive') NOT NULL,

    UNIQUE INDEX `Product_sku_key`(`sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_userName_key` ON `User`(`userName`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductHistory` ADD CONSTRAINT `ProductHistory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
