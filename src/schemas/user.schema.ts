import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    password: string({
      required_error: "password is required",
    })
      .min(6, "Password is too short, should be 6 chars min")
      .max(100),
    passwordConfirmation: string({
      required_error: "name is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("Not a valid email!"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type createUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
