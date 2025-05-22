import React, { useEffect, useRef, useState } from "react";

import _isEqual from "lodash/isEqual";
import {
  type FieldValues,
  type UseFormReturn,
  FormProvider as Form,
} from "react-hook-form";

type BaseProps<A extends FieldValues, B extends FieldValues | undefined> = {
  children: React.ReactNode;
  methods: UseFormReturn<A, any, B>;
  onSubmit?: VoidFunction;
  id?: string;
  className?: string;
};

// We should consider if we want onBlur and onSubmit to coexist in the same time.
type Props<A extends FieldValues, B extends FieldValues | undefined> =
  | (BaseProps<A, B> & { onBlur: VoidFunction; defaultValues: A })
  | (BaseProps<A, B> & { onBlur?: undefined; defaultValues?: undefined });

/**
 * A provider component to manage form state and submission.
 * @link Here is the notion doc that explains usage of FormProvider and FormInput <https://www.notion.so/polyai/a21122f6200f4be3a49ff9ef78480596?v=21823515e11b4271b1cc3dbda81eecc1&p=9293a19d22044aa6bf932af571683ea1&pm=s>
 * @param {Props} id - This value is used with button that will have same the value of "form" prop. This is only needed if submit button needs to live outside the form. If button lives in the <form> tag this can be ignored.
 * @return {JSX.Element} The rendered form provider component.
 */
export default function FormProvider<
  A extends FieldValues,
  B extends FieldValues | undefined
>({
  children,
  onSubmit,
  onBlur,
  methods,
  id,
  defaultValues,
  className,
}: Props<A, B>) {
  const ref = useRef<HTMLFormElement>(null);
  const [oldDefaultValues, setOldDefaultValues] = useState(defaultValues);

  const isEdit = !!onBlur;

  const {
    reset,
    getValues,
    formState: { isDirty, isSubmitSuccessful },
  } = methods;

  const handleBlur = (event: React.FocusEvent<HTMLFormElement>) => {
    if (!isEdit) return;
    if (!isDirty) return;
    if (ref.current && !ref.current.contains(event.relatedTarget as Node)) {
      onBlur();
    }
  };

  // RHF does not reset isDirty field when form is successfully submitted so we have to do that manually
  // <https://github.com/react-hook-form/react-hook-form/issues/3097>
  useEffect(() => {
    if (isSubmitSuccessful) reset(getValues());
  }, [isSubmitSuccessful, reset, getValues]);

  // This resets the form when the draft is deleted
  useEffect(() => {
    if (!isEdit) return;
    if (!_isEqual(oldDefaultValues, defaultValues)) {
      reset(defaultValues);
      setOldDefaultValues(defaultValues);
    }
  }, [defaultValues, isEdit, reset, oldDefaultValues]);

  return (
    <Form {...methods}>
      <form
        ref={ref}
        id={id}
        onBlur={handleBlur}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
        }}
        className={className}
      >
        {children}
      </form>
    </Form>
  );
}
