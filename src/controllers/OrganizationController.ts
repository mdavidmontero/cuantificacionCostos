import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { hashPassword } from "../utils/auth";

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const { name, nit, nameAdmin, email, password } = req.body;
    const roleUserSuperAdmin = await prisma.user.findFirst({
      where: {
        roles: {
          equals: ["admin"],
        },
      },
    });
    if (!roleUserSuperAdmin) {
      const error = new Error("No tienes permisos para crear organizaciones");
      return res.status(401).json({ error: error.message });
    }
    const organizationExists = await prisma.organization.findFirst({
      where: {
        name: name,
      },
    });

    if (organizationExists) {
      const error = new Error("La organizacion ya existe");
      return res.status(409).json({ error: error.message });
    }

    const hash = await hashPassword(password);
    await prisma.organization.create({
      data: {
        name: name,
        nit: nit,
        users: {
          create: {
            name: nameAdmin,
            email: email,
            password: hash,
            roles: ["admin"],
            confirmed: true,
          },
        },
      },
    });
    res.send("Organizacion creada correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear organizacion" });
  }
};

export const updateOrganization = async (req: Request, res: Response) => {
  try {
    const { id, name, nit } = req.body;
    const organization = await prisma.organization.findFirst({
      where: {
        id: id,
      },
    });
    if (!organization) {
      const error = new Error("Organizacion no encontrada");
      return res.status(404).json({ error: error.message });
    }
    
    // Verificar que el usuario pertenece a la organización que intenta actualizar
    if (organization.id !== req.user.organizationId) {
      const error = new Error("No tienes permisos para actualizar esta organización");
      return res.status(403).json({ error: error.message });
    }
    
    await prisma.organization.update({
      where: {
        id: organization.id,
      },
      data: {
        name: name,
        nit: nit,
      },
    });
    res.send("Organizacion actualizada correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar organizacion" });
  }
};

export const getOrganization = async (req: Request, res: Response) => {
  try {
    const organization = await prisma.organization.findFirst({
      where: {
        id: req.params.id,
      },
    });
    if (!organization) {
      const error = new Error("Organizacion no encontrada");
      return res.status(404).json({ error: error.message });
    }
    
    // Verificar que el usuario pertenece a la organización que intenta obtener
    if (organization.id !== req.user.organizationId) {
      const error = new Error("No tienes permisos para acceder a esta organización");
      return res.status(403).json({ error: error.message });
    }
    
    res.status(200).json(organization);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener organizacion" });
  }
};

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await prisma.organization.findMany();
    res.status(200).json(organizations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener organizaciones" });
  }
};
