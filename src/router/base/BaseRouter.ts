import { Router } from "express";
import RouterType from "./RouterInterface";

abstract class BaseRoutes implements RouterType {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  abstract routes(): void;
}

export default BaseRoutes;
