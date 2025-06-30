import { Button, Chip, Modal, Text, TextInput } from "@mantine/core";
import type { DialogForm } from "../../types/CommonTypes";
import type { JobCreateUpdateDto, JobReadDto } from "../../types/JobTypes";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobCreateUpdateSchema } from "../../validators/JobValidators";
import useCreateJob from "./hooks/useCreateJob";
import useUpdateJob from "./hooks/useUpdateJob";
import FormProvider from "../../components/form/FormProvider";
import { FormTextInput } from "../../components/form/FormTextInput";
import { FormTextArea } from "../../components/form/FormTextArea";
import { useState } from "react";
import { Plus, X } from "lucide-react";

type JobDialogType = {
  opened: boolean;
  dialogFormState: DialogForm<JobReadDto>;
  onHide: () => void;
};

const JobDialog = ({ opened, dialogFormState, onHide }: JobDialogType) => {
  const [value, setValue] = useState<string>("");
  const jobCreateMutation = useCreateJob();
  const jobUpdateMutation = useUpdateJob();

  const formMethods = useForm<JobCreateUpdateDto>({
    resolver: zodResolver(JobCreateUpdateSchema),
    defaultValues:
      dialogFormState.operation === "update"
        ? dialogFormState.entity
        : undefined,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "technologies",
  });

  const onSubmit: SubmitHandler<JobCreateUpdateDto> = (job) => {
    if (dialogFormState.operation === "create") {
      jobCreateMutation.mutate(job, { onSuccess: onHide });
    } else {
      jobUpdateMutation.mutate(
        { jobId: dialogFormState.entity?._id!, job },
        { onSuccess: onHide }
      );
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onHide}
      title={dialogFormState.operation === "create" ? "New job" : "Job update"}
      centered
      size="lg"
    >
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={formMethods}>
        <div className="flex flex-col gap-3">
          <div>
            <Text size="sm">Name</Text>
            <FormTextInput<JobCreateUpdateDto> controlKey="name" withAsterisk />
          </div>
          <div>
            <Text size="sm">Technologies</Text>
            <div>
              <div className="flex gap-2 mb-2">
                <TextInput
                  placeholder="Add technology"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (value.trim()) {
                        append({ value: value.trim() });
                        setValue("");
                      }
                    }
                  }}
                  error={errors.technologies?.message}
                  classNames={{
                    error: "text-left",
                  }}
                />
                <Button
                  onClick={() => {
                    if (value.trim()) {
                      append({ value: value.trim() });
                      setValue("");
                    }
                  }}
                  className="px-6"
                >
                  <Plus size={15} />
                </Button>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {fields.map((field, index) => (
                  <Chip
                    icon={<X size={16} />}
                    key={field.id}
                    onChange={() => remove(index)}
                    variant="light"
                    defaultChecked
                  >
                    {field.value}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Text size="sm">Description</Text>
            <FormTextArea<JobCreateUpdateDto>
              controlKey="description"
              withAsterisk
              resize="vertical"
              rows={6}
            />
          </div>
        </div>
        <div className="flex gap-2 pt-4 justify-end">
          <Button
            onClick={onHide}
            disabled={
              jobCreateMutation.isPending || jobUpdateMutation.isPending
            }
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            autoFocus
            disabled={
              jobCreateMutation.isPending || jobUpdateMutation.isPending
            }
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default JobDialog;
