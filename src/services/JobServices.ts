import axios, { type AxiosResponse } from "axios";
import type { JobCreateType } from "../types/job/JobCreateType";
import type CommonResponse from "../infrastucture/CommonResponse";
import type CommonPaginationResponse from "../infrastucture/CommonPaginationResponse";
import type PaginationProps from "../infrastucture/PaginationProps";
import Endpoint from "../infrastucture/Endpoint";
import { axiosConfig } from "../utils/Utils";

export interface Job {
  _id: string;
  name: string;
  description: string;
}

interface JobServicesTypes {
  getJobs: (
    params: PaginationProps
  ) => Promise<AxiosResponse<CommonPaginationResponse<Job[]>>>;
  deleteJob: (jobId: string) => Promise<AxiosResponse<CommonResponse<Job>>>;
  createJob: (
    job: JobCreateType
  ) => Promise<AxiosResponse<CommonResponse<Job>>>;
  updateJob: (
    jobId: string,
    job: JobCreateType
  ) => Promise<AxiosResponse<CommonResponse<Job>>>;
}

export default function JobServices(): JobServicesTypes {
  const getJobs = (params: PaginationProps) => {
    return axios.get(Endpoint.JOBS, axiosConfig(params));
  };

  const deleteJob = (jobId: string) => {
    return axios.delete(`${Endpoint.JOBS}/${jobId}`);
  };

  const createJob = (job: JobCreateType) => {
    return axios.post(Endpoint.JOBS, job);
  };

  const updateJob = (jobId: string, job: JobCreateType) => {
    return axios.put(`${Endpoint.JOBS}/${jobId}`, job);
  };

  return { getJobs, deleteJob, createJob, updateJob };
}
