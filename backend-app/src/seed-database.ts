import { AppDataSource } from './data-source';
import { User } from './entities/User';
import { Product } from './entities/Product';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  try {
    // 1. INICIALIZAR Y CREAR TABLAS
    await AppDataSource.initialize();
    await AppDataSource.synchronize(); // ← ¡CREA LAS TABLAS!
    console.log('✅ Tablas creadas y conectado a SQLite');
    
    // 2. Verificar tablas existentes
    const tables = await AppDataSource.query(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    console.log('📊 Tablas existentes:', tables);

    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);

    // 3. Crear usuarios
    const adminUser = userRepository.create({
      nombre: 'Administrador',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      rol: 'admin'
    });

    const regularUser = userRepository.create({
      nombre: 'Usuario Regular',
      email: 'user@example.com',
      password: await bcrypt.hash('user123', 10),
      rol: 'usuario'
    });

    await userRepository.save([adminUser, regularUser]);

    // 4. Crear productos
    const products = [
      {
        nombre: 'Laptop Gaming',
        descripcion: 'Laptop de alto rendimiento para gaming',
        precio: 1200.00,
        stock: 10,
        usuario_creador: adminUser,
        usuario_creador_id: adminUser.id
      },
      {
        nombre: 'Teclado Mecánico',
        descripcion: 'Teclado mecánico con RGB',
        precio: 89.99,
        stock: 25,
        usuario_creador: adminUser,
        usuario_creador_id: adminUser.id
      },
      {
        nombre: 'Mouse Inalámbrico',
        descripcion: 'Mouse inalámbrico 1600DPI',
        precio: 45.50,
        stock: 30,
        usuario_creador: regularUser,
        usuario_creador_id: regularUser.id
      }
    ];

    for (const productData of products) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
      console.log(`✅ Producto creado: ${product.nombre}`);
    }

    console.log('✅ Base de datos poblada exitosamente!');
    await AppDataSource.destroy();

  } catch (error) {
    console.error('❌ Error en seeding:', error);
  }
}

// Ejecutar solo si es llamado directamente
if (require.main === module) {
  seedDatabase();
}