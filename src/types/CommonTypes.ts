import type { Path } from "react-hook-form";

export type SharedFormProps<T> = {
  controlKey: Path<T>;
};

export type EntityOperation = "create" | "update" | "read" | "delete";

export type DialogForm<T, OperationType = EntityOperation> = {
  visible: boolean;
  operation?: OperationType;
  entity?: T;
};
