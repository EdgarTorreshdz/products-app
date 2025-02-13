import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column("text")
  descripcion!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  precio!: number;

  @Column("int")
  stock!: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  usuario_creador!: User;
}
