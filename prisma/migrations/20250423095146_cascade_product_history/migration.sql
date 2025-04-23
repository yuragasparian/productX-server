-- DropForeignKey
ALTER TABLE `ProductHistory` DROP FOREIGN KEY `ProductHistory_productId_fkey`;

-- DropIndex
DROP INDEX `ProductHistory_productId_fkey` ON `ProductHistory`;

-- AddForeignKey
ALTER TABLE `ProductHistory` ADD CONSTRAINT `ProductHistory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
