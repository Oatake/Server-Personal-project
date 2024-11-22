/*
  Warnings:

  - The values [CANCEL] on the enum `OrderItem_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `orderitem` MODIFY `status` ENUM('COOKING', 'DONE') NOT NULL DEFAULT 'COOKING';
