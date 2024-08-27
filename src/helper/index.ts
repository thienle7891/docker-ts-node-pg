// import bcrypt from "bcrypt";
import * as argon2 from "argon2";
// import { SALT_ROUNDS } from "../constants";

export const genPasswordHash = async (password: string): Promise<string> => {
  const hash = await argon2.hash(password);
  return hash;
};
