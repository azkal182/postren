/*
  Warnings:

  - The primary key for the `Asrama` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Kelas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Keluhan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `KeluhansOnMasters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_KeluhanToMaster` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sex` to the `Master` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KeluhansOnMasters" DROP CONSTRAINT "KeluhansOnMasters_keluhanId_fkey";

-- DropForeignKey
ALTER TABLE "KeluhansOnMasters" DROP CONSTRAINT "KeluhansOnMasters_masterId_fkey";

-- DropForeignKey
ALTER TABLE "Master" DROP CONSTRAINT "Master_asramaId_fkey";

-- DropForeignKey
ALTER TABLE "Master" DROP CONSTRAINT "Master_kelasId_fkey";

-- DropForeignKey
ALTER TABLE "_KeluhanToMaster" DROP CONSTRAINT "_KeluhanToMaster_A_fkey";

-- DropForeignKey
ALTER TABLE "_KeluhanToMaster" DROP CONSTRAINT "_KeluhanToMaster_B_fkey";

-- AlterTable
ALTER TABLE "Asrama" DROP CONSTRAINT "Asrama_pkey",
ADD CONSTRAINT "Asrama_pkey" PRIMARY KEY ("name", "sex");

-- AlterTable
ALTER TABLE "Kelas" DROP CONSTRAINT "Kelas_pkey",
ADD CONSTRAINT "Kelas_pkey" PRIMARY KEY ("name", "sex");

-- AlterTable
ALTER TABLE "Keluhan" DROP CONSTRAINT "Keluhan_pkey",
ADD CONSTRAINT "Keluhan_pkey" PRIMARY KEY ("name", "sex");

-- AlterTable
ALTER TABLE "Master" ADD COLUMN     "sex" "SexType" NOT NULL;

-- DropTable
DROP TABLE "KeluhansOnMasters";

-- DropTable
DROP TABLE "_KeluhanToMaster";

-- CreateTable
CREATE TABLE "MasterKeluhan" (
    "id" SERIAL NOT NULL,
    "masterId" TEXT NOT NULL,
    "keluhanName" TEXT NOT NULL,
    "keluhanSex" "SexType" NOT NULL,

    CONSTRAINT "MasterKeluhan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterKeluhan_masterId_keluhanName_keluhanSex_key" ON "MasterKeluhan"("masterId", "keluhanName", "keluhanSex");

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_kelasId_sex_fkey" FOREIGN KEY ("kelasId", "sex") REFERENCES "Kelas"("name", "sex") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_asramaId_sex_fkey" FOREIGN KEY ("asramaId", "sex") REFERENCES "Asrama"("name", "sex") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterKeluhan" ADD CONSTRAINT "MasterKeluhan_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterKeluhan" ADD CONSTRAINT "MasterKeluhan_keluhanName_keluhanSex_fkey" FOREIGN KEY ("keluhanName", "keluhanSex") REFERENCES "Keluhan"("name", "sex") ON DELETE RESTRICT ON UPDATE CASCADE;
