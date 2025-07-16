import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createMeasurement = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const medidaExists = await prisma.unidadMedida.findFirst({
      where: {
        name: name.toUpperCase(),
        organizationId: req.user.organizationId,
      },
    });
    if (medidaExists) {
      const error = new Error("La unidad de medida ya existe");
      return res.status(409).json({ error: error.message });
    }
    await prisma.unidadMedida.create({
      data: {
        name: name,
        organizationId: req.user.organizationId,
      },
    });
    res.send("Unidad de medida creada correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear unidad de medida " });
  }
};

export const updateMeasurement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const Measurement = await prisma.unidadMedida.findFirst({
      where: {
        id: +id,
        organizationId: req.user.organizationId,
      },
    });
    if (!Measurement) {
      const error = new Error("unidad de medida  no encontrada");
      return res.status(404).json({ error: error.message });
    }
    await prisma.unidadMedida.update({
      where: {
        id: Measurement.id,
      },
      data: {
        name,
      },
    });
    res.send("unidad de medida actualizada correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar unidad de medida " });
  }
};

export const getMeasurementById = async (req: Request, res: Response) => {
  try {
    const Measurement = await prisma.unidadMedida.findFirst({
      where: {
        id: +req.params.id,
        organizationId: req.user.organizationId,
      },
    });
    if (!Measurement) {
      const error = new Error("unidad de medida no encontrada");
      return res.status(404).json({ error: error.message });
    }
    res.json(Measurement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener unidad de medida " });
  }
};

export const getMeasurements = async (req: Request, res: Response) => {
  try {
    const Measurements = await prisma.unidadMedida.findMany({
      where: {
        organizationId: req.user.organizationId,
      },
    });
    res.json(Measurements);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener unidad de medida s" });
  }
};

export const deleteMeasurement = async (req: Request, res: Response) => {
  try {
    const Measurement = await prisma.unidadMedida.findFirst({
      where: {
        id: +req.params.id,
        organizationId: req.user.organizationId,
      },
    });
    if (!Measurement) {
      const error = new Error("unidad de medida no encontrada");
      return res.status(404).json({ error: error.message });
    }
    await prisma.unidadMedida.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.send("unidad de medida  eliminada correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar unidad de medida " });
  }
};
