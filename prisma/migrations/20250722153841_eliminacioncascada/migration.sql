-- DropForeignKey
ALTER TABLE "CostosProduccion" DROP CONSTRAINT "CostosProduccion_registroId_fkey";

-- DropForeignKey
ALTER TABLE "MateriaPrimaDirecta" DROP CONSTRAINT "MateriaPrimaDirecta_registroId_fkey";

-- AddForeignKey
ALTER TABLE "MateriaPrimaDirecta" ADD CONSTRAINT "MateriaPrimaDirecta_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostosProduccion" ADD CONSTRAINT "CostosProduccion_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
