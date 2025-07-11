import { useMutation, useQueryClient } from "@tanstack/react-query";
import JobServices from "../../../services/JobServices";
import type { JobCreateUpdateDto } from "../../../types/JobTypes";
import { handleError, handleSuccess } from "../../../utils/Utils";

export default function useUpdateJob() {
  const { updateJob } = JobServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { jobId: string; job: JobCreateUpdateDto }) =>
      updateJob(params.jobId, params.job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      handleSuccess("Job updated successfully!");
    },
    onError: handleError,
  });
}
