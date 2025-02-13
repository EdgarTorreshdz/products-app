import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController';

const router = Router();

router.post('/', authMiddleware, createProduct);
router.get('/', authMiddleware, getProducts);  // 🔹 Debe requerir autenticación
router.get('/:id', authMiddleware, getProductById);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
