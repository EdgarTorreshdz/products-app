import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { AuthRequest } from "../middleware/authMiddleware";

const productRepository = AppDataSource.getRepository(Product);

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const nuevoProducto = productRepository.create({
      nombre,
      descripcion,
      precio,
      stock,
      usuario_creador: { id: req.user.id }
    });

    await productRepository.save(nuevoProducto);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const producto = await productRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["usuario_creador"]
      });
  
      if (!producto) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
  
      res.json(producto);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener producto", error });
    }
  };

  
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const productos = await productRepository.find({ relations: ["usuario_creador"] });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const producto = await productRepository.findOne({ where: { id: parseInt(id) }, relations: ["usuario_creador"] });

    if (!producto) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    if (producto.usuario_creador.id !== req.user.id) {
      res.status(403).json({ message: "No autorizado" });
      return;
    }

    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.precio = precio;
    producto.stock = stock;

    await productRepository.save(producto);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const producto = await productRepository.findOne({ where: { id: parseInt(id) }, relations: ["usuario_creador"] });

    if (!producto) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    if (producto.usuario_creador.id !== req.user.id) {
      res.status(403).json({ message: "No autorizado" });
      return;
    }

    await productRepository.remove(producto);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};
