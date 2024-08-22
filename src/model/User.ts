import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { Store } from "./Store";
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @ManyToOne(() => Store, (store) => store.store_id)
  store_id!: Store;
}
