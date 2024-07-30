import { genPasswordHash } from "../helper";
import { User } from "../model/User";

interface UserRepoType {
  save: (user: User) => Promise<void>;
  update: (user: User) => Promise<void>;
  delete: (userId: number) => Promise<void>;
  retrieveById(userId: number): Promise<User>;
  retrieveAll(): Promise<User[]>;
}

export class UserRepo implements UserRepoType {
  async save(user: User): Promise<void> {
    try {
      const { username, password } = user;
      const newUser = new User();
      newUser.username = username;
      newUser.password = await genPasswordHash(password);
      await newUser.save();
    } catch (error) {
      throw new Error("Error saving user");
    }
  }

  async update(user: User): Promise<void> {
    try {
      const newUser = await User.findOne({
        where: {
          user_id: user.user_id,
        },
      });
      if (!newUser) {
        throw new Error("Note not found!");
      }
      newUser.username = user.username;
      newUser.password = await genPasswordHash(user.password);

      await newUser.save();
    } catch (error) {
      throw new Error("Failed to create note!");
    }
  }
  async delete(userId: number): Promise<void> {
    try {
      const delUser = await User.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!delUser) {
        throw new Error("Note not found!");
      }

      await delUser.remove();
    } catch (error) {
      throw new Error("Failed to create note!");
    }
  }
  async retrieveById(userId: number): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!user) {
        throw new Error("Note not found!");
      }
      return user;
    } catch (error) {
      throw new Error("Failed to create note!");
    }
  }
  async retrieveAll(): Promise<User[]> {
    try {
      return await User.find();
    } catch (error) {
      throw new Error("Failed to create note!");
    }
  }
}
