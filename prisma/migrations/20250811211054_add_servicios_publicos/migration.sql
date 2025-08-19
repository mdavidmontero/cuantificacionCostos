-- CreateTable
CREATE TABLE "ServicioPublico" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "porcentaje" DOUBLE PRECISION NOT NULL,
    "vinculadoProduccion" BOOLEAN NOT NULL,
    "organizationId" TEXT NOT NULL,
    "registroId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServicioPublico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServicioPublico" ADD CONSTRAINT "ServicioPublico_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicioPublico" ADD CONSTRAINT "ServicioPublico_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
