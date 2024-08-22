import { Request, Response } from "express";
import { User } from "../model/User";
import { UserRepo } from "../repository/UserRepo";
import { Store } from "../model/Store";

class StoreController {
  async create(req: Request, res: Response) {
    try {
      console.log(1234563453423);
      const { store_name: storeName } = req.body;
      const store = new Store();
      store.store_name = storeName;
      await store.save();
      res.status(200).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const delStore = await Store.findOne({
        where: {
          store_id: id,
        },
      });
      if (!delStore) {
        throw new Error("Note not found!");
      }

      await delStore.remove();
      await new UserRepo().delete(id);
      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted note!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const new_note = await new UserRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched user by id!",
        data: new_note,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const new_note = await new UserRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all user data!",
        data: new_note,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const newUser = new User();

      newUser.user_id = id;
      newUser.username = req.body.name;
      newUser.password = req.body.password;

      await new UserRepo().update(newUser);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated note data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}
export default new StoreController();
