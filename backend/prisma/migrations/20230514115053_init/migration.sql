/*
  Warnings:

  - You are about to drop the column `image_url` on the `User` table. All the data in the column will be lost.
  - Added the required column `photo_url` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `image_url`,
    ADD COLUMN `photo_url` VARCHAR(191) NOT NULL;
