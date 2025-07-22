-- AlterTable
ALTER TABLE "CostosProduccion" ALTER COLUMN "totalGastosMercadeo" DROP NOT NULL,
ALTER COLUMN "totalCostosOperacion" DROP NOT NULL,
ALTER COLUMN "totalGastosProduccion" DROP NOT NULL,
ALTER COLUMN "totalCostoProduccionUnitario" DROP NOT NULL,
ALTER COLUMN "precioVentaUnitario" DROP NOT NULL,
ALTER COLUMN "margenUtilidadUnitario" DROP NOT NULL;
