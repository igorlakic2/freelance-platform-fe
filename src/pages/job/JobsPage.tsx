import useJobs from "./JobQueries";

const JobsPage = () => {
  const { data } = useJobs();
  console.log("data", data);
  return <div>JobsPage</div>;
};

export default JobsPage;
