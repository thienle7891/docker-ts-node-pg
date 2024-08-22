import BaseRoutes from "./base/BaseRouter";
import validate from "../helper/validate";
import { updateUserSchema } from "../schema/UserSchema";
import UserController from "../controller/UserController";
import { createStoreSchema } from "../schema/StoreSchema";
import StoreController from "../controller/StoreController";

class StoreRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("", validate(createStoreSchema), StoreController.create);
    this.router.patch(
      "/:id",
      validate(updateUserSchema),
      UserController.update
    );
    this.router.delete("/:id", UserController.delete);
    this.router.get("", UserController.findAll);
    this.router.get("/:id", UserController.findById);
  }
}

export default new StoreRoutes().router;
