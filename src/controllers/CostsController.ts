import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { MateriaPrimaDirecta } from "@prisma/client";
import { format, parseISO, startOfWeek } from "date-fns";

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

export const getEvolucionCostos = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, modo = "dia", productoId } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({
        message:
          "Debe proporcionar 'startDate' y 'endDate' en formato YYYY-MM-DD",
      });
    }
    const start = parseISO(startDate as string);
    const end = parseISO(endDate as string);
    const whereClause = productoId
      ? {
          date: {
            gte: start,
            lte: end,
          },
          productoId: +productoId,
        }
      : {
          date: {
            gte: start,
            lte: end,
          },
        };
    const registros = await prisma.registroCostoProduccion.findMany({
      where: whereClause,
      orderBy: {
        date: "asc",
      },
      include: {
        costoProduccion: true,
      },
    });
    const filtrados = registros.filter((r) => r.costoProduccion);
    if (modo === "semana") {
      const agrupados = filtrados.reduce((acc, r) => {
        const semana = format(
          startOfWeek(r.date, { weekStartsOn: 1 }),
          "yyyy-MM-dd"
        );
        if (!acc[semana])
          acc[semana] = {
            semana,
            total: 0,
            count: 0,
            margenUtilidadUnitario: 0,
          };
        acc[semana].total += r.costoProduccion!.totalCostoProduccionUnitario;
        acc[semana].margenUtilidadUnitario +=
          r.costoProduccion.margenUtilidadUnitario;
        acc[semana].count += 1;
        return acc;
      }, {} as Record<string, { semana: string; total: number; count: number; margenUtilidadUnitario: number }>);
      const datos = Object.values(agrupados).map(
        ({ semana, total, count, margenUtilidadUnitario }) => ({
          fecha: semana,
          costoUnitario: total / count,
          margenUtilidadUnitario: margenUtilidadUnitario,
        })
      );

      return res.json(datos);
    }
    // Por día
    const datos = filtrados.map((r) => ({
      fecha: format(r.date, "yyyy-MM-dd"),
      costoUnitario: r.costoProduccion!.totalCostoProduccionUnitario,
      margenUtilidadUnitario: r.costoProduccion.margenUtilidadUnitario,
    }));
    res.json(datos);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los registros de costos." });
  }
};
