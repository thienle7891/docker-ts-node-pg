import Database from "./config/database";
import StoreRouter from "./router/StoreRouter";
import UserRouter from "./router/UserRouter";
import express, { Application, Request, Response } from "express";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databaseSync(): void {
    const db = new Database();
    db.dataSource?.initialize();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Hello World!");
    });
    this.app.use("/api/v1/user", UserRouter);
    this.app.use("/api/v1/store", StoreRouter);
  }
}

const port = 8888;
const app = new App().app;

app.listen(port, () => {
  console.log(`Server ss ss running on port ${port}`);
});
