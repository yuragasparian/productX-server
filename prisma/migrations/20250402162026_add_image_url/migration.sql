/*
  Warnings:

  - Added the required column `product_image` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_image` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `product_image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `user_image` VARCHAR(191) NOT NULL;
