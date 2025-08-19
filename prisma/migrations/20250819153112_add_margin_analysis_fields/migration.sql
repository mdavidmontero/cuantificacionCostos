-- AlterTable
ALTER TABLE "CostosProduccion" ADD COLUMN     "costosFinancieros" DOUBLE PRECISION,
ADD COLUMN     "impuestos" DOUBLE PRECISION,
ADD COLUMN     "margenDeseado" DOUBLE PRECISION,
ADD COLUMN     "margenUtilidadNeto" DOUBLE PRECISION,
ADD COLUMN     "otrosGastos" DOUBLE PRECISION;
