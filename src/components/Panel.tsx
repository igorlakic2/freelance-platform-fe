import type { ReactNode } from "react";

const Panel = ({ children }: { children: ReactNode }) => {
  return <div className="panel">{children}</div>;
};

export default Panel;
