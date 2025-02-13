import { User } from './user.model';

export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  usuario_creador: User;
}
