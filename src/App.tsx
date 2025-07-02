import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import Content from "./routes/Content";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  colors: {
    primary: [
      "#ffffff",
      "#e1e7f7",
      "#b3c4eb",
      "#809bdc",
      "#4e72cd",
      "#2553c1",
      "#00398b",
      "#002f72",
      "#002459",
      "#001b3e",
    ],
  },
  primaryColor: "primary",
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <Content />
    </MantineProvider>
  );
}

export default App;
