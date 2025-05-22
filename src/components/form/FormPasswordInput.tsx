import { Controller, useFormContext } from "react-hook-form";
import { PasswordInput, type PasswordInputProps } from "@mantine/core";
import type { SharedFormProps } from "../../types/CommonTypes";

type Props<T> = SharedFormProps<T> & PasswordInputProps;

export const FormPasswordInput = <T,>({ controlKey, ...rest }: Props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={controlKey}
      render={({ field, fieldState: { error } }) => (
        <PasswordInput
          {...field}
          value={field.value ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            field.onChange(!!e.target.value ? e.target.value : null)
          }
          error={error?.message}
          classNames={{
            error: "text-left",
          }}
          {...rest}
        />
      )}
    />
  );
};
