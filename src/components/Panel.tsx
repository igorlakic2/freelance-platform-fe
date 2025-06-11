import type { ReactNode } from "react";

const Panel = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <div className="panel">
      {title && <p className="text-2xl font-bold">{title}</p>}
      <div>{children}</div>
    </div>
  );
};

export default Panel;
