/*
  Warnings:

  - Added the required column `cantidadProducida` to the `RegistroCostoProduccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidadesFinales` to the `RegistroCostoProduccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perdidasEstimadas` to the `RegistroCostoProduccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidadMedida` to the `RegistroCostoProduccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RegistroCostoProduccion" ADD COLUMN     "cantidadProducida" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cantidadesFinales" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "perdidasEstimadas" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unidadMedida" TEXT NOT NULL;
