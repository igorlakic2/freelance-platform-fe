import { useMutation, useQueryClient } from "@tanstack/react-query";
import JobServices from "../../../services/JobServices";
import { handleError, handleSuccess } from "../../../utils/Utils";

export default function useDeleteJob() {
  const { deleteJob } = JobServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => deleteJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      handleSuccess("Job deleted successfully!");
    },
    onError: handleError,
  });
}
