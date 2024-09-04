import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinTable,
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

  @ManyToOne(() => Store, (store) => store.users)
  store!: Store;
}
