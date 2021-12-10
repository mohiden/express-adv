import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import { User, IUser } from "../models";

export async function createUser(
  input: DocumentDefinition<
    Omit<IUser, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    const user = await User.create(input);
    return omit(user.toJSON(), "password");
  } catch (e) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) return false;

  return omit(user.toJSON(), "password");
}
