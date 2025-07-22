import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;

    const productExists = await prisma.productos.findFirst({
      where: {
        nombre: nombre.toUpperCase(),
        organizacionId: req.user.organizationId,
      },
    });
    if (productExists) {
      const error = new Error("El producto ya existe");
      return res.status(409).json({ error: error.message });
    }
    await prisma.productos.create({
      data: {
        nombre: nombre,
        organizacionId: req.user.organizationId,
      },
    });
    res.send("Producto creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const updateproduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const producto = await prisma.productos.findFirst({
      where: {
        id: +id,
        organizacionId: req.user.organizationId,
      },
    });
    if (!producto) {
      const error = new Error("Producto no encontrado");
      return res.status(404).json({ error: error.message });
    }
    await prisma.productos.update({
      where: {
        id: producto.id,
      },
      data: {
        nombre,
      },
    });
    res.send("Producto actualizado correctamente");
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const getproductoById = async (req: Request, res: Response) => {
  try {
    const producto = await prisma.productos.findFirst({
      where: {
        id: +req.params.id,
        organizacionId: req.user.organizationId,
      },
    });
    if (!producto) {
      const error = new Error("Product  no encontrado");
      return res.status(404).json({ error: error.message });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const getproducts = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.productos.findMany({
      where: {
        organizacionId: req.user.organizationId,
      },
    });
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const deleteproducts = async (req: Request, res: Response) => {
  try {
    const producto = await prisma.productos.findFirst({
      where: {
        id: +req.params.id,
        organizacionId: req.user.organizationId,
      },
    });
    if (!producto) {
      const error = new Error("Producto no encontrado");
      return res.status(404).json({ error: error.message });
    }
    await prisma.productos.delete({
      where: {
        id: producto.id,
      },
    });
    res.send("Producto eliminado correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};
