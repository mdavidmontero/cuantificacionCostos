/*
  Warnings:

  - You are about to drop the `_CostosGeneralesToRegistroCostoProduccion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CostosIndirectosFabricacionToRegistroCostoProduccion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CostosOperacionToRegistroCostoProduccion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GastosVentasToRegistroCostoProduccion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ManoObraDirectaToRegistroCostoProduccion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ManoObraIndirectaToRegistroCostoProduccion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CostosGeneralesToRegistroCostoProduccion" DROP CONSTRAINT "_CostosGeneralesToRegistroCostoProduccion_A_fkey";

-- DropForeignKey
ALTER TABLE "_CostosGeneralesToRegistroCostoProduccion" DROP CONSTRAINT "_CostosGeneralesToRegistroCostoProduccion_B_fkey";

-- DropForeignKey
ALTER TABLE "_CostosIndirectosFabricacionToRegistroCostoProduccion" DROP CONSTRAINT "_CostosIndirectosFabricacionToRegistroCostoProduccion_A_fkey";

-- DropForeignKey
ALTER TABLE "_CostosIndirectosFabricacionToRegistroCostoProduccion" DROP CONSTRAINT "_CostosIndirectosFabricacionToRegistroCostoProduccion_B_fkey";

-- DropForeignKey
ALTER TABLE "_CostosOperacionToRegistroCostoProduccion" DROP CONSTRAINT "_CostosOperacionToRegistroCostoProduccion_A_fkey";

-- DropForeignKey
ALTER TABLE "_CostosOperacionToRegistroCostoProduccion" DROP CONSTRAINT "_CostosOperacionToRegistroCostoProduccion_B_fkey";

-- DropForeignKey
ALTER TABLE "_GastosVentasToRegistroCostoProduccion" DROP CONSTRAINT "_GastosVentasToRegistroCostoProduccion_A_fkey";

-- DropForeignKey
ALTER TABLE "_GastosVentasToRegistroCostoProduccion" DROP CONSTRAINT "_GastosVentasToRegistroCostoProduccion_B_fkey";

-- DropForeignKey
ALTER TABLE "_ManoObraDirectaToRegistroCostoProduccion" DROP CONSTRAINT "_ManoObraDirectaToRegistroCostoProduccion_A_fkey";

-- DropForeignKey
ALTER TABLE "_ManoObraDirectaToRegistroCostoProduccion" DROP CONSTRAINT "_ManoObraDirectaToRegistroCostoProduccion_B_fkey";

-- DropForeignKey
ALTER TABLE "_ManoObraIndirectaToRegistroCostoProduccion" DROP CONSTRAINT "_ManoObraIndirectaToRegistroCostoProduccion_A_fkey";

-- DropForeignKey
ALTER TABLE "_ManoObraIndirectaToRegistroCostoProduccion" DROP CONSTRAINT "_ManoObraIndirectaToRegistroCostoProduccion_B_fkey";

-- AlterTable
ALTER TABLE "CostosGenerales" ADD COLUMN     "registroId" TEXT;

-- AlterTable
ALTER TABLE "CostosIndirectosFabricacion" ADD COLUMN     "registroId" TEXT;

-- AlterTable
ALTER TABLE "CostosOperacion" ADD COLUMN     "registroId" TEXT;

-- AlterTable
ALTER TABLE "GastosVentas" ADD COLUMN     "registroId" TEXT;

-- AlterTable
ALTER TABLE "ManoObraDirecta" ADD COLUMN     "registroId" TEXT;

-- AlterTable
ALTER TABLE "ManoObraIndirecta" ADD COLUMN     "registroId" TEXT;

-- AlterTable
ALTER TABLE "MateriaPrimaDirecta" ALTER COLUMN "registroId" DROP NOT NULL;

-- DropTable
DROP TABLE "_CostosGeneralesToRegistroCostoProduccion";

-- DropTable
DROP TABLE "_CostosIndirectosFabricacionToRegistroCostoProduccion";

-- DropTable
DROP TABLE "_CostosOperacionToRegistroCostoProduccion";

-- DropTable
DROP TABLE "_GastosVentasToRegistroCostoProduccion";

-- DropTable
DROP TABLE "_ManoObraDirectaToRegistroCostoProduccion";

-- DropTable
DROP TABLE "_ManoObraIndirectaToRegistroCostoProduccion";

-- AddForeignKey
ALTER TABLE "ManoObraDirecta" ADD CONSTRAINT "ManoObraDirecta_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostosIndirectosFabricacion" ADD CONSTRAINT "CostosIndirectosFabricacion_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManoObraIndirecta" ADD CONSTRAINT "ManoObraIndirecta_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostosGenerales" ADD CONSTRAINT "CostosGenerales_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostosOperacion" ADD CONSTRAINT "CostosOperacion_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GastosVentas" ADD CONSTRAINT "GastosVentas_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
