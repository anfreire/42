/*
  Warnings:

  - The `color` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "color" AS ENUM ('primary', 'secondary', 'error', 'warning', 'success');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "color",
ADD COLUMN     "color" "color" NOT NULL DEFAULT 'primary';
