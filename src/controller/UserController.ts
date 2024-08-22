import e, { Request, Response } from "express";
import { User } from "../model/User";
import { UserRepo } from "../repository/UserRepo";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      console.log(132);
      const user = new User();
      user.username = username;
      user.password = password;
      await user.save();
      res.status(200).json({ success: true, message: "User created" });
    } catch (error) {
      res.status(400).json({ success: false, message: "Error creating user" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const delUser = await User.findOne({
        where: {
          user_id: id,
        },
      });
      if (!delUser) {
        throw new Error("Note not found!");
      }
      await delUser.remove();
      res.status(200).json({
        success: true,
        message: "Successfully deleted note!",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const user = await User.findOne({
        where: {
          user_id: id,
        },
      });
      if (!user) {
        throw new Error("Note not found!");
      }
      res.status(200).json({
        success: true,
        message: "Successfully fetched user by id!",
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.status(200).json({
        success: true,
        message: "Successfully fetched all user data!",
        data: users,
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
      console.log(123);
      const existUser = await User.findOne({
        where: {
          user_id: id,
        },
      });
      if (!existUser) {
        throw new Error("Note not found!");
      }
      existUser.user_id = id;
      existUser.username = req.body.name;
      existUser.password = req.body.password;
      await existUser.save();
      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated note data!",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
}
export default new UserController();
