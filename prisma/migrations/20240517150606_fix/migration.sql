-- AlterEnum
ALTER TYPE "SexType" ADD VALUE 'ALL';

-- DropForeignKey
ALTER TABLE "Master" DROP CONSTRAINT "Master_kelasId_fkey";

-- AlterTable
ALTER TABLE "Master" ALTER COLUMN "kelasId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("name") ON DELETE SET NULL ON UPDATE CASCADE;
