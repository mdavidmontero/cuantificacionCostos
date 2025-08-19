import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { checkPassword, hashPassword } from "../utils/auth";
import formidable from "formidable";
import { generateJWT } from "../utils/jwt";
import { v4 as uuid } from "uuid";
import { generateToken } from "../utils/token";
import { prisma } from "../config/prisma";

export interface JwtPayload {
  id: string;
}

export const createAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password, name, nameOrganization, nit } = req.body;

    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExist) {
      const error = new Error("El usuario ya esta registrado");
      return res.status(409).json({ error: error.message });
    }

    const organization = await prisma.organization.findFirst({
      where: {
        nit: nit,
      },
    });

    if (organization) {
      const error = new Error("El nit de la organizacion ya esta registrado");
      return res.status(409).json({ error: error.message });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        confirmed: true,
        roles: ["admin"],
        token: generateToken(),
        organization: {
          create: {
            name: nameOrganization,
            nit: nit,
          },
        },
      },
    });
    delete user.password;
    res.json({
      user: user,
      token: generateJWT({ id: user.id }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const confirmAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token } = req.body;
    const tokenExists = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!tokenExists) {
      const error = new Error("Token no válido");
      return res.status(404).json({ error: error.message });
    }
    await prisma.user.update({
      where: {
        id: tokenExists.id,
      },
      data: {
        confirmed: true,
        token: "",
      },
    });
    res.send("Cuenta confirmada correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        roles: true,
        image: true,
        password: true,
        organizationId: true,
        organization: {
          select: {
            name: true,
            nit: true,
          },
        },
      },
    });

    if (!user) {
      const error = new Error("Usuario no encontrado");
      return res.status(404).json({ error: error.message });
    }

    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) {
      const error = new Error("Password Incorrecto");
      return res.status(401).json({ error: error.message });
    }
    const token = generateJWT({ id: user.id });
    delete user.password;
    res.json({
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Hubo un error" });
  }
};
export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ error: error.message });
    }
    const token = generateToken();
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: token,
      },
    });

    res.send("Hemos enviado un codigo de confirmacion a su correo");
  } catch (error) {
    return res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token } = req.body;
    const tokenExists = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!tokenExists) {
      const error = new Error("Token no válido");
      return res.status(404).json({ error: error.message });
    }
    res.send("Token válido, Define tu nuevo password");
  } catch (error) {
    return res.status(500).json({ error: "Hubo un error" });
  }
};

export const requestConfirmationCode = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ error: error.message });
    }
    if (user.confirmed) {
      const error = new Error("El usuario ya esta confirmado");
      return res.status(403).json({ error: error.message });
    }

    const confirmed = generateToken();

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: confirmed,
      },
    });

    res.send("Hemos enviado un codigo de confirmacion a su correo");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Hubo un error" });
  }
};

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const form = formidable({
    multiples: false,
  });
  try {
    form.parse(req, (error, fields, files) => {
      cloudinary.uploader.upload(
        files.file[0].filepath,
        { public_id: uuid() },
        async function (error, result) {
          if (error) {
            const error = new Error("Hubo un error al subir la imagen");
            return res.status(500).json({ error: error.message });
          }
          if (result) {
            req.user.image = result.secure_url;
            await prisma.user.update({
              where: {
                id: req.user.id,
              },
              data: {
                image: result.secure_url,
              },
            });
            res.json({
              image: result.secure_url,
            });
          }
        }
      );
    });
  } catch (e) {
    const error = new Error("Hubo un error");
    return res.status(500).json({ error: error.message });
  }
};
export const getUser = async (req: Request, res: Response): Promise<any> => {
  return res.json({ user: req.user, token: req.token });
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email, cargo } = req.body;
    const emailExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (emailExist && emailExist.id !== req.user.id) {
      const error = new Error("El email ya esta registrado");
      return res.status(409).json({ error: error.message });
    }
    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name,
        email,
      },
    });
    res.send("Perfil actualizado correctamente");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Hubo un error" });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await prisma.user.findMany({
      where: {
        confirmed: true,
        organizationId: req.user.organizationId,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
    console.log(error);
  }
};

export const getUsersAll = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        roles: { has: "user" },
        organizationId: req.user.organizationId,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const passwordCheck = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("El Password es incorrecto");
    return res.status(401).json({ error: error.message });
  }

  res.send("Password Correcto");
};

export const updateCurrentUserPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { current_password, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    const isPasswordCorrect = await checkPassword(
      current_password,
      user.password
    );
    if (!isPasswordCorrect) {
      const error = new Error("El Password actual es incorrecto");
      return res.status(401).json({ error: error.message });
    }
    try {
      user.password = await hashPassword(password);
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: user.password,
        },
      });

      res.send("El Password se modificó correctamente");
    } catch (error) {
      res.status(500).send("Hubo un error");
    }
  } catch (error) {
    return res.status(500).send("Hubo un error");
  }
};

export const resetPasswordWithToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const tokenExists = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!tokenExists) {
      const error = new Error("Token no válido");
      return res.status(404).json({ error: error.message });
    }
    const user = await prisma.user.findFirst({
      where: {
        token: tokenExists.token,
      },
    });
    const hash = await hashPassword(password);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
        token: "",
      },
    });
    res.send("El password se modificó correctamente");
  } catch (error) {
    return res.status(500).send("Hubo un error");
  }
};

export const updateUserStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, status } = req.body;
  try {
    // Verificar que el usuario pertenece a la misma organización
    const userToUpdate = await prisma.user.findFirst({
      where: {
        id: userId,
        organizationId: req.user.organizationId,
      },
    });

    if (!userToUpdate) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        confirmed: status,
      },
    });
    res.send("Usuario actualizado correctamente");
  } catch (error) {
    return res.status(500).send("Hubo un error");
  }
};

export const createUserOrganization = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email, password, role } = req.body;
    const roleUserSuperAdminAndOrganization = await prisma.user.findFirst({
      where: {
        roles: {
          equals: ["admin"],
        },
        email: req.user.email,
        organization: {
          id: req.user.organizationId,
        },
      },
    });

    if (!roleUserSuperAdminAndOrganization) {
      const error = new Error(
        "No tienes permisos para crear usuario en la organización"
      );
      return res.status(401).json({ error: error.message });
    }
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExist) {
      const error = new Error("El correo ya esta registrado");
      return res.status(409).json({ error: error.message });
    }
    const passwordHash = await hashPassword(password);
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        confirmed: true,
        roles: [role],
        organizationId: req.user.organizationId,
        token: generateToken(),
      },
    });
    res.send("Usuario creado correctamente");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Hubo un error" });
  }
};

export const getUsersAllOrganization = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        organizationId: req.user.organizationId,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Hubo un error" });
  }
};
