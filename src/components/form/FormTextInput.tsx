import { Controller, useFormContext } from "react-hook-form";
import { TextInput, type TextInputProps } from "@mantine/core";
import type { SharedFormProps } from "../../types/CommonTypes";

type Props<T> = SharedFormProps<T> & TextInputProps;

export const FormTextInput = <T,>({ controlKey, ...rest }: Props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={controlKey}
      render={({ field, fieldState: { error } }) => (
        <TextInput
          {...field}
          value={field.value ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            field.onChange(!!e.target.value ? e.target.value : null)
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
