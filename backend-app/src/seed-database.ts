import { AppDataSource } from './data-source';
import { User } from './entities/User';
import { Product } from './entities/Product';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);
    const adminExists = await userRepository.findOneBy({ email: 'admin@example.com' });
    if (adminExists) {
      console.log('⚠️ Usuarios ya existen, se omite el seeding.');
      await AppDataSource.destroy();
      return;
    }
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