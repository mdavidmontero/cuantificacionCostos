import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createCosts = async (req: Request, res: Response) => {
  try {
    const {
      productoId,
      date = new Date(),

      materiaPrimaDirecta,
      manoObraDirecta,
      costosIndirectosFabricacion,
      manoObraIndirecta,
      costosGenerales,
      costosOperacion,
      gastosVentas,

      costoProduccion,
    } = req.body;

    const organizationId = req.user.organizationId;

    if (!organizationId || !productoId) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const registro = await prisma.$transaction(async (tx) => {
      return await tx.registroCostoProduccion.create({
        data: {
          date: new Date(date),
          producto: { connect: { id: productoId } },
          organization: { connect: { id: organizationId } },

          materiaPrimaDirecta: {
            create: materiaPrimaDirecta?.map((item: any) => ({
              name: item.name,
              unidadMedida: item.unidadMedida,
              cantidad: item.cantidad,
              costoUnitario: item.costoUnitario,
              costoTotal: item.costoTotal,
              organizationId,
            })),
          },

          manoObraDirecta: {
            create: manoObraDirecta?.map((item: any) => ({
              nombre: item.nombre,
              unidadMedida: item.unidadMedida,
              cantidad: item.cantidad,
              costoUnitario: item.costoUnitario,
              costoTotal: item.costoTotal,
              organizationId,
            })),
          },

          costosIndirectosFabricacion: {
            create: costosIndirectosFabricacion?.map((item: any) => ({
              nombre: item.nombre,
              unidadMedida: item.unidadMedida,
              cantidad: item.cantidad,
              costoUnitario: item.costoUnitario,
              costoTotal: item.costoTotal,
              organizationId,
            })),
          },

          manoObraIndirecta: {
            create: manoObraIndirecta?.map((item: any) => ({
              nombre: item.nombre,
              unidadMedida: item.unidadMedida,
              costoUnitario: item.costoUnitario,
              costoTotal: item.costoTotal,
              organizationId,
            })),
          },

          costosGenerales: {
            create: costosGenerales?.map((item: any) => ({
              nombre: item.nombre,
              valorTotal: item.valorTotal,
              costosTotales: item.costosTotales,
              organizationId,
            })),
          },

          costosOperacion: {
            create: costosOperacion?.map((item: any) => ({
              nombre: item.nombre,
              valorTotal: item.valorTotal,
              totales: item.totales,
              organizationId,
            })),
          },

          gastosVentas: {
            create: gastosVentas?.map((item: any) => ({
              nombre: item.nombre,
              valorTotal: item.valorTotal,
              totales: item.totales,
              organizationId,
            })),
          },

          costoProduccion: costoProduccion
            ? {
                create: {
                  totalGastosMercadeo: costoProduccion.totalGastosMercadeo,
                  totalCostosOperacion: costoProduccion.totalCostosOperacion,
                  totalGastosProduccion: costoProduccion.totalGastosProduccion,
                  totalCostoProduccionUnitario:
                    costoProduccion.totalCostoProduccionUnitario,
                  precioVentaUnitario: costoProduccion.precioVentaUnitario,
                  margenUtilidadUnitario:
                    costoProduccion.margenUtilidadUnitario,
                  organizationId,
                },
              }
            : undefined,
        },
      });
    });

    return res.status(201).json({
      message: "Registro de costos creado con éxito",
      registro,
    });
  } catch (error) {
    console.error("Error al crear el registro de costos:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
