/*
  Warnings:

  - A unique constraint covering the columns `[foreground,background,icon]` on the table `Appearance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Appearance_foreground_background_key";

-- AlterTable
ALTER TABLE "Appearance" ADD COLUMN     "icon" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Appearance_foreground_background_icon_key" ON "Appearance"("foreground", "background", "icon");
