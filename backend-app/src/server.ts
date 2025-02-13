import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { AppDataSource } from './data-source';
import "reflect-metadata";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";


const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.get('/', (req, res) => {
  res.send('API funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log('Conexión a la base de datos establecida');
  })
  .catch((error) => console.log('Error conectando a la base de datos:', error))