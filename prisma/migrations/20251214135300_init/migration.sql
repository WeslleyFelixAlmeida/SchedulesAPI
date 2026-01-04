-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `image` LONGBLOB NOT NULL,
    `name` VARCHAR(225) NOT NULL,
    `shortDescription` VARCHAR(225) NOT NULL,
    `longDescription` VARCHAR(191) NOT NULL,
    `type` ENUM('UNIQUE', 'MULTIPLE') NOT NULL,
    `imageType` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventMultipleSchedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` INTEGER NOT NULL,
    `schedule` VARCHAR(225) NOT NULL,
    `occupied` BOOLEAN NOT NULL DEFAULT false,
    `eventId` INTEGER NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventUniqueSchedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `schedule` VARCHAR(225) NOT NULL,
    `eventId` INTEGER NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventMultipleSchedules` ADD CONSTRAINT `EventMultipleSchedules_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventMultipleSchedules` ADD CONSTRAINT `EventMultipleSchedules_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventUniqueSchedules` ADD CONSTRAINT `EventUniqueSchedules_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventUniqueSchedules` ADD CONSTRAINT `EventUniqueSchedules_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
