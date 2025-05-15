import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Content from "./routes/Content";
import "./App.css";

function App() {
  return (
    <MantineProvider>
      <Content />
    </MantineProvider>
  );
}

export default App;
