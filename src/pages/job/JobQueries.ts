import { useQuery } from "@tanstack/react-query";
import JobServices from "../../services/JobServices";
import { usePaginate } from "../../infrastucture/usePaginate";

export default function useJobs() {
  const { getJobs } = JobServices();
  const { page, rowsPerPage } = usePaginate();

  const query = useQuery({
    queryKey: ["jobs", page, rowsPerPage],
    queryFn: () =>
      getJobs({ page: page + 1, rowsPerPage }).then((res) => res.data),
  });

  return {
    ...query,
    data: query.data?.data,
    totalItems: query.data?.totalItems,
    page,
    rowsPerPage,
  };
}
