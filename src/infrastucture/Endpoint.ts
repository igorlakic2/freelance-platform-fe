const apiUrl = import.meta.env.VITE_API_URL;

const Endpoint = {
  JOBS: apiUrl + "/jobs",
  AUTH: apiUrl + "/auth",
};

export default Endpoint;
