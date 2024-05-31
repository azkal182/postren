/*
  Warnings:

  - The primary key for the `Keluhan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `MasterKeluhan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MasterKeluhan" DROP CONSTRAINT "MasterKeluhan_keluhanName_keluhanSex_fkey";

-- DropForeignKey
ALTER TABLE "MasterKeluhan" DROP CONSTRAINT "MasterKeluhan_masterId_fkey";

-- AlterTable
ALTER TABLE "Keluhan" DROP CONSTRAINT "Keluhan_pkey",
ADD CONSTRAINT "Keluhan_pkey" PRIMARY KEY ("name");

-- DropTable
DROP TABLE "MasterKeluhan";

-- CreateTable
CREATE TABLE "_KeluhanToMaster" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KeluhanToMaster_AB_unique" ON "_KeluhanToMaster"("A", "B");

-- CreateIndex
CREATE INDEX "_KeluhanToMaster_B_index" ON "_KeluhanToMaster"("B");

-- AddForeignKey
ALTER TABLE "_KeluhanToMaster" ADD CONSTRAINT "_KeluhanToMaster_A_fkey" FOREIGN KEY ("A") REFERENCES "Keluhan"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeluhanToMaster" ADD CONSTRAINT "_KeluhanToMaster_B_fkey" FOREIGN KEY ("B") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;
