// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './Product';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column() // Se almacenará el hash de la contraseña
  password!: string;

  @Column({ default: 'usuario' })
  rol!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creado_en!: Date;

  // Relación con productos
  @OneToMany(() => Product, (product) => product.usuario_creador)
  productos!: Product[];
}