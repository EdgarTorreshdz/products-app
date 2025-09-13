import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        email: string;
        rol: string;
      };
    }
  }
}

// Esto es necesario para que TypeScript lo trate como módulo
export {};