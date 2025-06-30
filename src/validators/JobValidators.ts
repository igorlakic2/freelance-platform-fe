import { z } from "zod";

export const JobCreateUpdateSchema = z.object({
  name: z.string({ message: "Name is required" }),
  description: z.string({ message: "Description is required" }),
  technologies: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .min(1),
});

export const JobReadSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  technologies: z.array(
    z.object({
      value: z.string(),
    })
  ),
});
