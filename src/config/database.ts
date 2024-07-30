import "reflect-metadata";
// import * as dotenv from "dotenv";
import { User } from "../model/User";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

class Database {
  public dataSource: DataSource | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_USER = process.env.POSTGRES_USER as unknown as string;
  private POSTGRES_PASSWORD = process.env
    .POSTGRES_PASSWORD as unknown as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;

  constructor() {
    this.connectToPostgreSQL();
  }

  private async connectToPostgreSQL() {
    this.dataSource = new DataSource({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      type: "postgres",
      entities: [User],
      synchronize: true,
      logging: false,
    });
    this.dataSource
      .initialize()
      .then(() => {
        console.log("Success");
      })
      .catch(() => {
        console.log("Error");
      });
  }
}

export default Database;
