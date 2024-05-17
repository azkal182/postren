-- CreateEnum
CREATE TYPE "SexType" AS ENUM ('LK', 'PR');

-- CreateEnum
CREATE TYPE "ReturnTo" AS ENUM ('RUMAH', 'RS', 'ASRAMA');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "sex" "SexType" NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Master" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnAt" TIMESTAMP(3),
    "kelasId" TEXT NOT NULL,
    "asramaId" TEXT NOT NULL,
    "description" TEXT,
    "room" TEXT,
    "returnTo" "ReturnTo" NOT NULL DEFAULT 'ASRAMA',

    CONSTRAINT "Master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelas" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Asrama" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Asrama_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_asramaId_fkey" FOREIGN KEY ("asramaId") REFERENCES "Asrama"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
