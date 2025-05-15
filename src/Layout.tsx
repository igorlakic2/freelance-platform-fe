import { AppShell, Burger, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";
import {
  IconBriefcase2,
  IconUsers,
  IconUserSearch,
  IconUserCircle,
} from "@tabler/icons-react";

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
          <span>Logo</span>
          <Text className="cursor-pointer" onClick={logout} size="md">
            Logout
          </Text>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          onClick={() => navigate("/jobs")}
          label="Jobs"
          leftSection={<IconBriefcase2 size={16} stroke={1.5} />}
          active={pathname === "/jobs"}
        />
        <NavLink
          onClick={() => navigate("/users")}
          label="Users"
          leftSection={<IconUsers size={16} stroke={1.5} />}
          active={pathname === "/users"}
        />
        <NavLink
          onClick={() => navigate("/profile")}
          label="Profile"
          leftSection={<IconUserCircle size={16} stroke={1.5} />}
          active={pathname === "/profile"}
        />
        <NavLink
          onClick={() => navigate("/proposals")}
          label="Proposals"
          leftSection={<IconUserSearch size={16} stroke={1.5} />}
          active={pathname === "/proposals"}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
