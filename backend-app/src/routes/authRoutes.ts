import { Router, Response, NextFunction } from "express";
import { register, login } from "../controllers/authController";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/perfil", authMiddleware, (req: AuthRequest, res: Response, next: NextFunction) => {
  res.json({ message: "Ruta protegida accedida con éxito", user: req.user });
});

export default router;
