/*
  Warnings:

  - Added the required column `studentId` to the `Master` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Master" ADD COLUMN     "studentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
