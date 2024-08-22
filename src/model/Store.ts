import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  store_id!: number;

  @Column()
  store_name!: string;

  @Column()
  password!: string;

  @OneToMany(() => User, (user) => user.user_id)
  user_ids!: User[];
}
