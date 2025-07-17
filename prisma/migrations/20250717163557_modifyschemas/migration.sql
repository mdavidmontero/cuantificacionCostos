/*
  Warnings:

  - You are about to drop the column `unidadMedidaId` on the `CostosIndirectosFabricacion` table. All the data in the column will be lost.
  - You are about to drop the column `unidadMedidaId` on the `ManoObraDirecta` table. All the data in the column will be lost.
  - You are about to drop the column `unidadMedidaId` on the `ManoObraIndirecta` table. All the data in the column will be lost.
  - You are about to drop the column `unidadMedidaId` on the `MateriaPrimaDirecta` table. All the data in the column will be lost.
  - Added the required column `unidadMedida` to the `CostosIndirectosFabricacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidadMedida` to the `ManoObraDirecta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidadMedida` to the `ManoObraIndirecta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidadMedida` to the `MateriaPrimaDirecta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CostosIndirectosFabricacion" DROP COLUMN "unidadMedidaId",
ADD COLUMN     "unidadMedida" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ManoObraDirecta" DROP COLUMN "unidadMedidaId",
ADD COLUMN     "unidadMedida" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ManoObraIndirecta" DROP COLUMN "unidadMedidaId",
ADD COLUMN     "unidadMedida" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MateriaPrimaDirecta" DROP COLUMN "unidadMedidaId",
ADD COLUMN     "unidadMedida" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RegistroCostoProduccion" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
