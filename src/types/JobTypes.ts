import { z } from "zod";
import {
  JobCreateUpdateSchema,
  JobReadSchema,
} from "../validators/JobValidators";

export type JobCreateUpdateDto = z.infer<typeof JobCreateUpdateSchema>;
export type JobReadDto = z.infer<typeof JobReadSchema>;
