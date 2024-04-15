/*
  Warnings:

  - You are about to drop the column `budget` on the `Project` table. All the data in the column will be lost.
  - Added the required column `background` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foreground` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reward` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confidence` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "budget",
ADD COLUMN     "appearanceId" TEXT,
ADD COLUMN     "background" TEXT NOT NULL,
ADD COLUMN     "foreground" TEXT NOT NULL,
ADD COLUMN     "projectValue" TEXT,
ADD COLUMN     "reward" TEXT NOT NULL,
DROP COLUMN "confidence",
ADD COLUMN     "confidence" INTEGER NOT NULL,
ALTER COLUMN "dueDate" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Appearance" (
    "id" TEXT NOT NULL,
    "foreground" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Appearance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appearance_foreground_background_icon_key" ON "Appearance"("foreground", "background", "icon");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_appearanceId_fkey" FOREIGN KEY ("appearanceId") REFERENCES "Appearance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
