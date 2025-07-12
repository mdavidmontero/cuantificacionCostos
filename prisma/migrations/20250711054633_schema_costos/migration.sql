-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'SUPER_ADMIN',
    "token" TEXT NOT NULL DEFAULT '',
    "image" TEXT,
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnidadMedida" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "UnidadMedida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Productos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "organizacionId" TEXT NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaPrimaDirecta" (
    "id" SERIAL NOT NULL,
    "registroId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unidadMedidaId" INTEGER NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "costoUnitario" DOUBLE PRECISION NOT NULL,
    "costoTotal" DOUBLE PRECISION NOT NULL,
    "organizationId" TEXT,

    CONSTRAINT "MateriaPrimaDirecta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManoObraDirecta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "unidadMedidaId" INTEGER NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "costoUnitario" DOUBLE PRECISION NOT NULL,
    "costoTotal" DOUBLE PRECISION NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ManoObraDirecta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostosIndirectosFabricacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "unidadMedidaId" INTEGER NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "costoUnitario" DOUBLE PRECISION NOT NULL,
    "costoTotal" DOUBLE PRECISION NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CostosIndirectosFabricacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManoObraIndirecta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "unidadMedidaId" INTEGER NOT NULL,
    "costoUnitario" DOUBLE PRECISION NOT NULL,
    "costoTotal" DOUBLE PRECISION NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ManoObraIndirecta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostosGenerales" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "costosTotales" DOUBLE PRECISION NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CostosGenerales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostosOperacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "totales" DOUBLE PRECISION NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CostosOperacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GastosVentas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "totales" DOUBLE PRECISION NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GastosVentas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostosProduccion" (
    "id" TEXT NOT NULL,
    "registroId" TEXT NOT NULL,
    "totalGastosMercadeo" DOUBLE PRECISION NOT NULL,
    "totalCostosOperacion" DOUBLE PRECISION NOT NULL,
    "totalGastosProduccion" DOUBLE PRECISION NOT NULL,
    "totalCostoProduccionUnitario" DOUBLE PRECISION NOT NULL,
    "precioVentaUnitario" DOUBLE PRECISION NOT NULL,
    "margenUtilidadUnitario" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT,

    CONSTRAINT "CostosProduccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroCostoProduccion" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "productoId" INTEGER NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistroCostoProduccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ManoObraDirectaToRegistroCostoProduccion" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ManoObraDirectaToRegistroCostoProduccion_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CostosIndirectosFabricacionToRegistroCostoProduccion" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CostosIndirectosFabricacionToRegistroCostoProduccion_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ManoObraIndirectaToRegistroCostoProduccion" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ManoObraIndirectaToRegistroCostoProduccion_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CostosGeneralesToRegistroCostoProduccion" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CostosGeneralesToRegistroCostoProduccion_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CostosOperacionToRegistroCostoProduccion" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CostosOperacionToRegistroCostoProduccion_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GastosVentasToRegistroCostoProduccion" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GastosVentasToRegistroCostoProduccion_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_nit_key" ON "Organization"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "CostosProduccion_registroId_key" ON "CostosProduccion"("registroId");

-- CreateIndex
CREATE INDEX "_ManoObraDirectaToRegistroCostoProduccion_B_index" ON "_ManoObraDirectaToRegistroCostoProduccion"("B");

-- CreateIndex
CREATE INDEX "_CostosIndirectosFabricacionToRegistroCostoProduccion_B_index" ON "_CostosIndirectosFabricacionToRegistroCostoProduccion"("B");

-- CreateIndex
CREATE INDEX "_ManoObraIndirectaToRegistroCostoProduccion_B_index" ON "_ManoObraIndirectaToRegistroCostoProduccion"("B");

-- CreateIndex
CREATE INDEX "_CostosGeneralesToRegistroCostoProduccion_B_index" ON "_CostosGeneralesToRegistroCostoProduccion"("B");

-- CreateIndex
CREATE INDEX "_CostosOperacionToRegistroCostoProduccion_B_index" ON "_CostosOperacionToRegistroCostoProduccion"("B");

-- CreateIndex
CREATE INDEX "_GastosVentasToRegistroCostoProduccion_B_index" ON "_GastosVentasToRegistroCostoProduccion"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnidadMedida" ADD CONSTRAINT "UnidadMedida_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaPrimaDirecta" ADD CONSTRAINT "MateriaPrimaDirecta_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroCostoProduccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaPrimaDirecta" ADD CONSTRAINT "MateriaPrimaDirecta_unidadMedidaId_fkey" FOREIGN KEY ("unidadMedidaId") REFERENCES "UnidadMedida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaPrimaDirecta" ADD CONSTRAINT "MateriaPrimaDirecta_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManoObraDirecta" ADD CONSTRAINT "ManoObraDirecta_unidadMedidaId_fkey" FOREIGN KEY ("unidadMedidaId") REFERENCES "UnidadMedida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManoObraDirecta" ADD CONSTRAINT "ManoObraDirecta_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostosIndirectosFabricacion" ADD CONSTRAINT "CostosIndirectosFabricacion_unidadMedidaId_fkey" FOREIGN KEY ("unidadMedidaId") REFERENCES "UnidadMedida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostosIndirectosFabricacion" ADD CONSTRAINT "CostosIndirectosFabricacion_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManoObraIndirecta" ADD CONSTRAINT "ManoObraIndirecta_unidadMedidaId_fkey" FOREIGN KEY ("unidadMedidaId") REFERENCES "UnidadMedida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManoObraIndirecta" ADD CONSTRAINT "ManoObraIndirecta_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostosGenerales" ADD CONSTRAINT "CostosGenerales_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostosOperacion" ADD CONSTRAINT "CostosOperacion_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GastosVentas" ADD CONSTRAINT "GastosVentas_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostosProduccion" ADD CONSTRAINT "CostosProduccion_registroId_fkey" FOREIGN KEY ("registroId") REFERENCES "RegistroCostoProduccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostosProduccion" ADD CONSTRAINT "CostosProduccion_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroCostoProduccion" ADD CONSTRAINT "RegistroCostoProduccion_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroCostoProduccion" ADD CONSTRAINT "RegistroCostoProduccion_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManoObraDirectaToRegistroCostoProduccion" ADD CONSTRAINT "_ManoObraDirectaToRegistroCostoProduccion_A_fkey" FOREIGN KEY ("A") REFERENCES "ManoObraDirecta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManoObraDirectaToRegistroCostoProduccion" ADD CONSTRAINT "_ManoObraDirectaToRegistroCostoProduccion_B_fkey" FOREIGN KEY ("B") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostosIndirectosFabricacionToRegistroCostoProduccion" ADD CONSTRAINT "_CostosIndirectosFabricacionToRegistroCostoProduccion_A_fkey" FOREIGN KEY ("A") REFERENCES "CostosIndirectosFabricacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostosIndirectosFabricacionToRegistroCostoProduccion" ADD CONSTRAINT "_CostosIndirectosFabricacionToRegistroCostoProduccion_B_fkey" FOREIGN KEY ("B") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManoObraIndirectaToRegistroCostoProduccion" ADD CONSTRAINT "_ManoObraIndirectaToRegistroCostoProduccion_A_fkey" FOREIGN KEY ("A") REFERENCES "ManoObraIndirecta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManoObraIndirectaToRegistroCostoProduccion" ADD CONSTRAINT "_ManoObraIndirectaToRegistroCostoProduccion_B_fkey" FOREIGN KEY ("B") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostosGeneralesToRegistroCostoProduccion" ADD CONSTRAINT "_CostosGeneralesToRegistroCostoProduccion_A_fkey" FOREIGN KEY ("A") REFERENCES "CostosGenerales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostosGeneralesToRegistroCostoProduccion" ADD CONSTRAINT "_CostosGeneralesToRegistroCostoProduccion_B_fkey" FOREIGN KEY ("B") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostosOperacionToRegistroCostoProduccion" ADD CONSTRAINT "_CostosOperacionToRegistroCostoProduccion_A_fkey" FOREIGN KEY ("A") REFERENCES "CostosOperacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostosOperacionToRegistroCostoProduccion" ADD CONSTRAINT "_CostosOperacionToRegistroCostoProduccion_B_fkey" FOREIGN KEY ("B") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GastosVentasToRegistroCostoProduccion" ADD CONSTRAINT "_GastosVentasToRegistroCostoProduccion_A_fkey" FOREIGN KEY ("A") REFERENCES "GastosVentas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GastosVentasToRegistroCostoProduccion" ADD CONSTRAINT "_GastosVentasToRegistroCostoProduccion_B_fkey" FOREIGN KEY ("B") REFERENCES "RegistroCostoProduccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
