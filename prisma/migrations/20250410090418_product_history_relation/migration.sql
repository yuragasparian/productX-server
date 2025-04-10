-- AddForeignKey
ALTER TABLE `ProductHistory` ADD CONSTRAINT `ProductHistory_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
