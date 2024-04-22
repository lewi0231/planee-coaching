-- CreateTable
CREATE TABLE "DiaryNote" (
    "id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "DiaryNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DiaryNote" ADD CONSTRAINT "DiaryNote_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
