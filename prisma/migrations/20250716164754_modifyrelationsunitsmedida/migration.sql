-- DropForeignKey
ALTER TABLE "CostosIndirectosFabricacion" DROP CONSTRAINT "CostosIndirectosFabricacion_unidadMedidaId_fkey";

-- DropForeignKey
ALTER TABLE "ManoObraDirecta" DROP CONSTRAINT "ManoObraDirecta_unidadMedidaId_fkey";

-- DropForeignKey
ALTER TABLE "ManoObraIndirecta" DROP CONSTRAINT "ManoObraIndirecta_unidadMedidaId_fkey";

-- DropForeignKey
ALTER TABLE "MateriaPrimaDirecta" DROP CONSTRAINT "MateriaPrimaDirecta_unidadMedidaId_fkey";

-- AlterTable
ALTER TABLE "CostosIndirectosFabricacion" ALTER COLUMN "unidadMedidaId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ManoObraDirecta" ALTER COLUMN "unidadMedidaId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ManoObraIndirecta" ALTER COLUMN "unidadMedidaId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "MateriaPrimaDirecta" ALTER COLUMN "unidadMedidaId" SET DATA TYPE TEXT;
