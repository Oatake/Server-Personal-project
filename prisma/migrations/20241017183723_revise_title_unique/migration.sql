/*
  Warnings:

  - You are about to alter the column `status` on the `orderitem` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.
  - A unique constraint covering the columns `[title]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `orderitem` MODIFY `status` ENUM('COOKING', 'DONE', 'CANCEL') NOT NULL DEFAULT 'COOKING';

-- CreateIndex
CREATE UNIQUE INDEX `Recipe_title_key` ON `Recipe`(`title`);
