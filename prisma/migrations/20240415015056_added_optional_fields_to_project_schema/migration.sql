-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "isPrivate" DROP NOT NULL,
ALTER COLUMN "isComplete" DROP NOT NULL,
ALTER COLUMN "isSelected" DROP NOT NULL;
