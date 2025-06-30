import { Controller, useFormContext } from "react-hook-form";
import { Textarea, type TextareaProps } from "@mantine/core";
import type { SharedFormProps } from "../../types/CommonTypes";

type Props<T> = SharedFormProps<T> & TextareaProps;

export const FormTextArea = <T,>({ controlKey, ...rest }: Props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={controlKey}
      render={({ field, fieldState: { error } }) => (
        <Textarea
          {...field}
          value={field.value ?? ""}
          onChange={(e) =>
            field.onChange(
              !!e.currentTarget.value ? e.currentTarget.value : null
            )
          }
          error={error?.message}
          {...rest}
          classNames={{
            error: "text-left",
          }}
        />
      )}
    />
  );
};
