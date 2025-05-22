import { z } from "zod";
import { LoginSchema, SignUpSchema } from "../validators/AuthValidators";

export type SignUpType = z.infer<typeof SignUpSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
