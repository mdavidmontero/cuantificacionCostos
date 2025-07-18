import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createMateriaPrima = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const materialExists = await prisma.productos.findFirst({
      where: {
        nombre: name.toUpperCase(),
        organizacionId: req.user.organizationId,
      },
    });
    if (materialExists) {
      const error = new Error("La materia prima ya existe");
      return res.status(409).json({ error: error.message });
    }
    await prisma.productos.create({
      data: {
        nombre: name,
        organizacionId: req.user.organizationId,
      },
    });
    res.send("Materia Prima creada correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear materia prima" });
  }
};

export const updateMateriaPrima = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const materiaPrima = await prisma.productos.findFirst({
      where: {
        id: +id,
        organizacionId: req.user.organizationId,
      },
    });
    if (!materiaPrima) {
      const error = new Error("Materia prima no encontrada");
      return res.status(404).json({ error: error.message });
    }
    await prisma.productos.update({
      where: {
        id: materiaPrima.id,
      },
      data: {
        nombre,
      },
    });
    res.send("Materia prima actualizada correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar materia prima" });
  }
};

export const getMateriaPrimaById = async (req: Request, res: Response) => {
  try {
    const materiaPrima = await prisma.productos.findFirst({
      where: {
        id: +req.params.id,
        organizacionId: req.user.organizationId,
      },
    });
    if (!materiaPrima) {
      const error = new Error("Materia prima no encontrada");
      return res.status(404).json({ error: error.message });
    }
    res.json(materiaPrima);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener materia prima" });
  }
};

export const getMateriaPrimas = async (req: Request, res: Response) => {
  try {
    const materiaPrimas = await prisma.productos.findMany({
      where: {
        organizacionId: req.user.organizationId,
      },
    });
    res.json(materiaPrimas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener materia primas" });
  }
};

export const deleteMateriaPrima = async (req: Request, res: Response) => {
  try {
    const materiaPrima = await prisma.productos.findFirst({
      where: {
        id: +req.params.id,
        organizacionId: req.user.organizationId,
      },
    });
    if (!materiaPrima) {
      const error = new Error("Materia prima no encontrada");
      return res.status(404).json({ error: error.message });
    }
    await prisma.productos.delete({
      where: {
        id: materiaPrima.id,
      },
    });
    res.send("Materia prima eliminada correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar materia prima" });
  }
};
