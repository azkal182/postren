-- AlterTable
ALTER TABLE "Master" ALTER COLUMN "returnTo" DROP NOT NULL,
ALTER COLUMN "returnTo" DROP DEFAULT;

-- CreateTable
CREATE TABLE "KeluhansOnMasters" (
    "keluhanId" TEXT NOT NULL,
    "masterId" TEXT NOT NULL,

    CONSTRAINT "KeluhansOnMasters_pkey" PRIMARY KEY ("keluhanId","masterId")
);

-- CreateTable
CREATE TABLE "Keluhan" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Keluhan_pkey" PRIMARY KEY ("name")
);

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
ALTER TABLE "KeluhansOnMasters" ADD CONSTRAINT "KeluhansOnMasters_keluhanId_fkey" FOREIGN KEY ("keluhanId") REFERENCES "Keluhan"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeluhansOnMasters" ADD CONSTRAINT "KeluhansOnMasters_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeluhanToMaster" ADD CONSTRAINT "_KeluhanToMaster_A_fkey" FOREIGN KEY ("A") REFERENCES "Keluhan"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeluhanToMaster" ADD CONSTRAINT "_KeluhanToMaster_B_fkey" FOREIGN KEY ("B") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;
