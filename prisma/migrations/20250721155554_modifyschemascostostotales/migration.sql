/*
  Warnings:

  - You are about to drop the column `costosTotales` on the `CostosGenerales` table. All the data in the column will be lost.
  - You are about to drop the column `totales` on the `CostosOperacion` table. All the data in the column will be lost.
  - You are about to drop the column `totales` on the `GastosVentas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CostosGenerales" DROP COLUMN "costosTotales";

-- AlterTable
ALTER TABLE "CostosOperacion" DROP COLUMN "totales";

-- AlterTable
ALTER TABLE "GastosVentas" DROP COLUMN "totales";
