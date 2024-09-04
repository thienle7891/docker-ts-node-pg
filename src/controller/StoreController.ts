import { Request, Response } from "express";
import { User } from "../model/User";
import { UserRepo } from "../repository/UserRepo";
import { Store } from "../model/Store";
import { genPasswordHash } from "../helper";

class StoreController {
  async create(req: Request, res: Response) {
    try {
      const { store_name: storeName, password } = req.body;
      const store = new Store();
      store.store_name = storeName;
      store.password = await genPasswordHash(password);
      store.users = [];
      await store.save();
      res.status(200).json({ message: "Store created" });
    } catch (error) {
      res.status(400).json({ message: "Error creating store" });
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
      const stores = await Store.find();

      res.status(200).json({
        success: true,
        message: "Successfully fetched all user data!",
        data: stores,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
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
