import { useState } from "react";
import { Modal, Button, Text } from "@mantine/core";
import ActionButton from "./ActionButton";
import { Trash } from "lucide-react";

function DeleteButton({
  onSubmit,
  text,
}: {
  onSubmit: () => void;
  text?: string;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <ActionButton
        size="sm"
        variant="white"
        color="red"
        onClick={() => setOpened(true)}
      >
        <Trash size={18} />
      </ActionButton>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Delete confirmation"
        centered
      >
        <Text>{text ?? "Are you sure you want to delete?"}</Text>
        <div className="flex gap-3 mt-6 justify-center">
          <Button variant="default" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              onSubmit();
              setOpened(false);
            }}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default DeleteButton;
