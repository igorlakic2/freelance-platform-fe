import { Button, Table } from "@mantine/core";
import useJobs from "./JobQueries";
import { Plus, Pencil } from "lucide-react";
import { useState } from "react";
import type { DialogForm } from "../../types/CommonTypes";
import type { JobReadDto } from "../../types/JobTypes";
import JobDialog from "./JobDialog";
import DeleteButton from "../../components/DeleteDialog";
import useDeleteJob from "./hooks/useDeleteJob";
import ActionButton from "../../components/ActionButton";
import Panel from "../../components/Panel";

const JobsPage = () => {
  const { data: jobs } = useJobs();
  const jobDeleteMutation = useDeleteJob();
  const [dialogFormState, setDialogFormState] = useState<
    DialogForm<JobReadDto>
  >({ visible: false });

  const rows = jobs?.map((job: JobReadDto) => (
    <tr key={job._id}>
      <td className="text-left p-2">{job.name}</td>
      <td className="text-right">
        <>
          <ActionButton
            size="sm"
            variant="white"
            onClick={() =>
              setDialogFormState({
                visible: true,
                entity: job,
                operation: "update",
              })
            }
          >
            <Pencil size={18} />
          </ActionButton>
          <DeleteButton
            onSubmit={() => jobDeleteMutation.mutate(job._id)}
            text="Are you sure you want to delete a job?"
          />
        </>
      </td>
    </tr>
  ));

  return (
    <Panel title="Jobs">
      <div className="flex">
        <Button
          leftSection={<Plus size={18} />}
          onClick={() =>
            setDialogFormState({ visible: true, operation: "create" })
          }
        >
          Add
        </Button>
      </div>
      <Table striped withTableBorder className="mt-3">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {dialogFormState.visible && (
        <JobDialog
          opened={dialogFormState.visible}
          dialogFormState={dialogFormState}
          onHide={() =>
            setDialogFormState({ visible: false, entity: undefined })
          }
        />
      )}
    </Panel>
  );
};

export default JobsPage;
