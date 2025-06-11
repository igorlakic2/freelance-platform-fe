import { Button, Modal, Text } from "@mantine/core";
import type { DialogForm } from "../../types/CommonTypes";
import type { JobCreateUpdateDto, JobReadDto } from "../../types/JobTypes";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobCreateUpdateSchema } from "../../validators/JobValidators";
import useCreateJob from "./hooks/useCreateJob";
import useUpdateJob from "./hooks/useUpdateJob";
import FormProvider from "../../components/form/FormProvider";
import { FormTextInput } from "../../components/form/FormTextInput";

type JobDialogType = {
  opened: boolean;
  dialogFormState: DialogForm<JobReadDto>;
  onHide: () => void;
};

const JobDialog = ({ opened, dialogFormState, onHide }: JobDialogType) => {
  const jobCreateMutation = useCreateJob();
  const jobUpdateMutation = useUpdateJob();

  const formMethods = useForm<JobCreateUpdateDto>({
    resolver: zodResolver(JobCreateUpdateSchema),
    defaultValues: dialogFormState.entity,
  });

  const { handleSubmit } = formMethods;

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
        <div>
          <div>
            <Text size="md">Name</Text>
            <FormTextInput<JobCreateUpdateDto> controlKey="name" withAsterisk />
          </div>
          <div>
            <Text size="md">Description</Text>
            <FormTextInput<JobCreateUpdateDto>
              controlKey="description"
              withAsterisk
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
