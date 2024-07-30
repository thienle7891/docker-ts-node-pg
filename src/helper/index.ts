import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants";

export const genPasswordHash = async (password: string): Promise<string> => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
