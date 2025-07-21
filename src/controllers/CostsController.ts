import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createCosts = async (req: Request, res: Response) => {
  try {
    const {
      productoId,
      unidadMedida,
      cantidadProducida,
      perdidasEstimadas,
      cantidadesFinales,
      date = new Date(),
      materiaPrimaDirecta = [],
      manoObraDirecta = [],
      costosIndirectosFabricacion = [],
      manoObraIndirecta = [],
      costosGenerales = [],
      costosOperacion = [],
      gastosVentas = [],
      costoProduccion,
    } = req.body;

    const organizationId = req.user.organizationId;

    if (!organizationId || !productoId) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const registro = await prisma.registroCostoProduccion.create({
      data: {
        date: new Date(date),
        producto: { connect: { id: +productoId } },
        organization: { connect: { id: organizationId } },
        unidadMedida,
        cantidadProducida,
        perdidasEstimadas,
        cantidadesFinales,
        materiaPrimaDirecta: {
          create: materiaPrimaDirecta.map((item: any) => ({
            name: item.name,
            unidadMedida: item.unidadMedida,
            cantidad: item.cantidad,
            costoUnitario: item.costoUnitario,
            costoTotal: item.costoTotal,
            organizationId,
          })),
        },
        manoObraDirecta: {
          create: manoObraDirecta.map((item: any) => ({
            nombre: item.nombre,
            unidadMedida: item.unidadMedida,
            cantidad: item.cantidad,
            costoUnitario: item.costoUnitario,
            costoTotal: item.costoTotal,
            organizationId,
          })),
        },
        costosIndirectosFabricacion: {
          create: costosIndirectosFabricacion.map((item: any) => ({
            nombre: item.nombre,
            unidadMedida: item.unidadMedida,
            cantidad: item.cantidad,
            costoUnitario: item.costoUnitario,
            costoTotal: item.costoTotal,
            organizationId,
          })),
        },
        manoObraIndirecta: {
          create: manoObraIndirecta.map((item: any) => ({
            nombre: item.nombre,
            unidadMedida: item.unidadMedida,
            cantidad: item.cantidad,
            costoUnitario: item.costoUnitario,
            costoTotal: item.costoTotal,
            organizationId,
          })),
        },
        costosGenerales: {
          create: costosGenerales.map((item: any) => ({
            nombre: item.nombre,
            valorTotal: item.valorTotal,
            organizationId,
          })),
        },
        costosOperacion: {
          create: costosOperacion.map((item: any) => ({
            nombre: item.nombre,
            valorTotal: item.valorTotal,
            organizationId,
          })),
        },
        gastosVentas: {
          create: gastosVentas.map((item: any) => ({
            nombre: item.nombre,
            valorTotal: item.valorTotal,
            organizationId,
          })),
        },
      },
    });

    if (costoProduccion) {
      await prisma.costosProduccion.create({
        data: {
          totalGastosMercadeo: costoProduccion.totalgastosMercadeo,
          totalCostosOperacion: costoProduccion.totalCostosOperacion,
          totalGastosProduccion: costoProduccion.totalGastosProduccion,
          totalCostoProduccionUnitario:
            costoProduccion.totalCostoProduccionUnitario,
          precioVentaUnitario: costoProduccion.precioVentaUnitario,
          margenUtilidadUnitario: costoProduccion.margenUtilidadUnitario,
          organizationId,
          registroId: registro.id,
        },
      });
    }

    return res.send("Registro de costos creado con éxito");
  } catch (error) {
    console.error("Error al crear el registro de costos:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
