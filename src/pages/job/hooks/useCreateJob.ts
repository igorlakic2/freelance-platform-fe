import { useMutation, useQueryClient } from "@tanstack/react-query";
import JobServices from "../../../services/JobServices";
import type { JobCreateUpdateDto } from "../../../types/JobTypes";
import { handleError, handleSuccess } from "../../../utils/Utils";

export default function useCreateJob() {
  const { createJob } = JobServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (job: JobCreateUpdateDto) => createJob(job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      handleSuccess("Job created successfully!");
    },
    onError: handleError,
  });
}
