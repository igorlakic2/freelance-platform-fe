import { z } from "zod";

export const JobCreateUpdateSchema = z.object({
  name: z.string({ message: "Name is required" }),
  description: z.string({ message: "Description is required" }),
});

export const JobReadSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
});
