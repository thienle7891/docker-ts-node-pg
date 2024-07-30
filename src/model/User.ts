import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;
}
