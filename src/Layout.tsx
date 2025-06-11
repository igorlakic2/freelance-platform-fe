import { AppShell, Burger, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";
import {
  Briefcase,
  UserRoundSearch,
  Users,
  CircleUserRound,
} from "lucide-react";
import logo from "./assets/logo.png";

const Layout = () => {
  const { logout } = useAuth();
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div className="flex justify-between items-center h-full w-full p-3">
          <img src={logo} width={100} />
          <Text className="cursor-pointer" onClick={logout} size="md">
            Logout
          </Text>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          onClick={() => navigate("/jobs")}
          label="Jobs"
          leftSection={<Briefcase />}
          active={pathname === "/jobs"}
        />
        <NavLink
          onClick={() => navigate("/users")}
          label="Users"
          leftSection={<Users />}
          active={pathname === "/users"}
        />
        <NavLink
          onClick={() => navigate("/profile")}
          label="Profile"
          leftSection={<CircleUserRound />}
          active={pathname === "/profile"}
        />
        <NavLink
          onClick={() => navigate("/proposals")}
          label="Proposals"
          leftSection={<UserRoundSearch />}
          active={pathname === "/proposals"}
        />
      </AppShell.Navbar>

      <AppShell.Main className="flex" style={{ backgroundColor: "#f9f9f9" }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
