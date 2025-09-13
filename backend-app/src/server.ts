import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { AppDataSource } from './data-source';
import "reflect-metadata";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando con SQLite');
});

// Función para inicializar la aplicación
async function initializeApp() {
  try {
    // Inicializar base de datos primero
    await AppDataSource.initialize();
    console.log('✅ Conexión a SQLite establecida correctamente');
    
    // Iniciar servidor después de conectar a la BD
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📊 Base de datos: ${process.env.DB_PATH || './local-database.sqlite'}`);
    });
    
  } catch (error) {
    console.error('❌ Error iniciando la aplicación:', error);
    process.exit(1); // Salir si no puede conectar a la BD
  }
}

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\n🛑 Apagando servidor gracefulmente...');
  try {
    await AppDataSource.destroy();
    console.log('✅ Conexión a base de datos cerrada');
  } catch (error) {
    console.error('❌ Error cerrando conexión:', error);
  }
  process.exit(0);
});

// Inicializar la aplicación
initializeApp();