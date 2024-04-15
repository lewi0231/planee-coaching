-- DropIndex
DROP INDEX "Project_updatedAt_idx";

-- CreateIndex
CREATE INDEX "Project_createdAt_idx" ON "Project"("createdAt");
