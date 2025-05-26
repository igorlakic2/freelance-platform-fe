import { Select, type SelectProps } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import type { SharedFormProps } from "../../types/CommonTypes";

type Props<T> = SharedFormProps<T> & SelectProps;

export const FormSelect = <T,>({ controlKey, ...rest }: Props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={controlKey}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            {...field}
            value={field.value ?? ""}
            onChange={(_value, option) =>
              field.onChange(!!option ? option.value : null)
            }
            error={error?.message}
            classNames={{
              error: "text-left",
            }}
            {...rest}
          />
        </>
      )}
    />
  );
};
