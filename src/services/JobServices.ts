import axios, { type AxiosResponse } from "axios";
import type CommonResponse from "../infrastucture/CommonResponse";
import type CommonPaginationResponse from "../infrastucture/CommonPaginationResponse";
import type PaginationProps from "../infrastucture/PaginationProps";
import Endpoint from "../infrastucture/Endpoint";
import { axiosConfig } from "../utils/Utils";
import type { JobCreateUpdateDto, JobReadDto } from "../types/JobTypes";

interface JobServicesTypes {
  getJobs: (
    params: PaginationProps
  ) => Promise<AxiosResponse<CommonPaginationResponse<JobReadDto[]>>>;
  deleteJob: (
    jobId: string
  ) => Promise<AxiosResponse<CommonResponse<JobReadDto>>>;
  createJob: (
    job: JobCreateUpdateDto
  ) => Promise<AxiosResponse<CommonResponse<JobReadDto>>>;
  updateJob: (
    jobId: string,
    job: JobCreateUpdateDto
  ) => Promise<AxiosResponse<CommonResponse<JobReadDto>>>;
}

export default function JobServices(): JobServicesTypes {
  const getJobs = (params: PaginationProps) => {
    return axios.get(Endpoint.JOBS, axiosConfig(params));
  };

  const deleteJob = (jobId: string) => {
    return axios.delete(`${Endpoint.JOBS}/${jobId}`);
  };

  const createJob = (job: JobCreateUpdateDto) => {
    return axios.post(Endpoint.JOBS, job);
  };

  const updateJob = (jobId: string, job: JobCreateUpdateDto) => {
    return axios.put(`${Endpoint.JOBS}/${jobId}`, job);
  };

  return { getJobs, deleteJob, createJob, updateJob };
}
