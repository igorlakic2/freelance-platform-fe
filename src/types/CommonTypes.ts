import type { Path } from "react-hook-form";

export type SharedFormProps<T> = {
  controlKey: Path<T>;
};
