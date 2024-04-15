/*
  Warnings:

  - You are about to drop the column `icon` on the `Appearance` table. All the data in the column will be lost.
  - You are about to drop the column `background` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `foreground` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[foreground,background]` on the table `Appearance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Appearance_foreground_background_icon_key";

-- AlterTable
ALTER TABLE "Appearance" DROP COLUMN "icon";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "background",
DROP COLUMN "foreground";

-- CreateIndex
CREATE UNIQUE INDEX "Appearance_foreground_background_key" ON "Appearance"("foreground", "background");
