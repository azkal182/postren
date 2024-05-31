-- AlterTable
ALTER TABLE "Asrama" ADD COLUMN     "sex" "SexType" NOT NULL DEFAULT 'LK';

-- AlterTable
ALTER TABLE "Kelas" ADD COLUMN     "sex" "SexType" NOT NULL DEFAULT 'LK';

-- AlterTable
ALTER TABLE "Keluhan" ADD COLUMN     "sex" "SexType" NOT NULL DEFAULT 'LK';
