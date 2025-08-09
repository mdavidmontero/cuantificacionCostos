import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";

interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  organizationId: string;
  organization: {
    name: string;
    nit: string;
  };
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      token: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error("No Autorizado");
    return res.status(401).json({ error: error.message });
  }

  const [, token] = bearer.split(" ");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "object" && decoded.id) {
      const user = await prisma.user.findFirst({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          roles: true,
          image: true,
          organizationId: true,
          organization: {
            select: {
              name: true,
              nit: true,
            },
          },
        },
      });
      if (user) {
        req.user = user;
        req.token = token;
        next();
      } else {
        res.status(401).json({ error: "No Autorizado" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Token no valido" });
  }
};
