/*
  Warnings:

  - You are about to drop the `UserOnBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserOnBook` DROP FOREIGN KEY `UserOnBook_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `UserOnBook` DROP FOREIGN KEY `UserOnBook_userId_fkey`;

-- DropTable
DROP TABLE `UserOnBook`;

-- CreateTable
CREATE TABLE `UserOnBooks` (
    `bookId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`bookId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserOnBooks` ADD CONSTRAINT `UserOnBooks_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOnBooks` ADD CONSTRAINT `UserOnBooks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
