// src/entities/Product.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column("text")
  descripcion!: string;

  @Column("real") // SQLite no tiene "decimal", usamos "real"
  precio!: number;

  @Column("integer")
  stock!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creado_en!: Date;

  @ManyToOne(() => User, (user) => user.productos, { 
    onDelete: "CASCADE",
    nullable: false 
  })
  @JoinColumn({ name: 'usuario_creador_id' }) // Mejor nombre para la columna FK
  usuario_creador!: User;

  // Columna FK explícita (opcional pero recomendado)
  @Column({ name: 'usuario_creador_id' })
  usuario_creador_id!: number;
}