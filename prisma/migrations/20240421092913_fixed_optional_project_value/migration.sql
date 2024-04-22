/*
  Warnings:

  - Made the column `projectValue` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectValue" SET NOT NULL;
