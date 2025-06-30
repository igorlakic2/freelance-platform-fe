import { useMutation, useQueryClient } from "@tanstack/react-query";
import JobServices from "../../../services/JobServices";

export default function useDeleteJob() {
  const { deleteJob } = JobServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => deleteJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error) => console.log(error),
  });
}
