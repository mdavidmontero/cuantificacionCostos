import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { MateriaPrimaDirecta } from "@prisma/client";

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
          create: materiaPrimaDirecta.map((item: MateriaPrimaDirecta) => ({
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

export const getRegistroCompleto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const registro = await prisma.registroCostoProduccion.findUnique({
      where: { id },
      include: {
        producto: true,
        organization: true,
        materiaPrimaDirecta: true,
        manoObraDirecta: true,
        costosIndirectosFabricacion: true,
        manoObraIndirecta: true,
        costosGenerales: true,
        costosOperacion: true,
        gastosVentas: true,
        costoProduccion: true,
      },
    });

    if (!registro) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    res.send(registro);
    // const resumen = {
    //   id: registro.id,
    //   date: registro.date.toISOString(),
    //   unidadMedida: registro.unidadMedida,
    //   cantidadProducida: registro.cantidadProducida,
    //   cantidadesFinales: registro.cantidadesFinales,
    //   producto: {
    //     nombre: registro.producto.nombre,
    //   },
    //   organization: {
    //     name: registro.organization.name,
    //   },
    //   costoProduccion: {
    //     totalGastosProduccion:
    //       registro.costoProduccion?.totalGastosProduccion ?? null,
    //     totalCostoProduccionUnitario:
    //       registro.costoProduccion?.totalCostoProduccionUnitario ?? null,
    //     precioVentaUnitario:
    //       registro.costoProduccion?.precioVentaUnitario ?? null,
    //     margenUtilidadUnitario:
    //       registro.costoProduccion?.margenUtilidadUnitario ?? null,
    //   },
    //   materiaPrimaDirecta: registro.materiaPrimaDirecta.map((item) => ({
    //     name: item.name,
    //     cantidad: item.cantidad,
    //     costoTotal: item.costoTotal,
    //   })),
    //   manoObraDirecta: registro.manoObraDirecta.map((item) => ({
    //     nombre: item.nombre,
    //     cantidad: item.cantidad,
    //     costoTotal: item.costoTotal,
    //   })),
    //   costosIndirectosFabricacion: registro.costosIndirectosFabricacion.map(
    //     (item) => ({
    //       nombre: item.nombre,
    //       cantidad: item.cantidad,
    //       costoTotal: item.costoTotal,
    //     })
    //   ),
    //   costosGenerales: registro.costosGenerales.map((item) => ({
    //     nombre: item.nombre,
    //     valorTotal: item.valorTotal,
    //   })),
    //   gastosVentas: registro.gastosVentas.map((item) => ({
    //     nombre: item.nombre,
    //     valorTotal: item.valorTotal,
    //   })),
    // };
    // return res.status(200).json(resumen);
  } catch (error) {
    console.error("Error al obtener el registro completo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAllRegistrosCostos = async (req: Request, res: Response) => {
  try {
    const registros = await prisma.registroCostoProduccion.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        producto: true,
        organization: true,
        materiaPrimaDirecta: true,
        manoObraDirecta: true,
        costosIndirectosFabricacion: true,
        manoObraIndirecta: true,
        costosGenerales: true,
        costosOperacion: true,
        gastosVentas: true,
        costoProduccion: true,
      },
    });

    return res.status(200).json(registros);
  } catch (error) {
    console.error("Error al obtener los registros de costos:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los registros de costos." });
  }
};
