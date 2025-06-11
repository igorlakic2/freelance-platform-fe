import { Button, type ButtonProps } from "@mantine/core";

type Props = {
  onClick: () => void;
} & ButtonProps;

const ActionButton = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Button {...rest} className="action-button">
      {children}
    </Button>
  );
};

export default ActionButton;
