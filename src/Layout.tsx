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
  const { logout, authData } = useAuth();
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const menuItems = [
    {
      label: "Jobs",
      icon: <Briefcase />,
      path: "/jobs",
      roles: ["ADMINISTRATOR", "CLIENT", "FREELANCER"],
    },
    {
      label: "Users",
      icon: <Users />,
      path: "/users",
      roles: ["ADMINISTRATOR"],
    },
    {
      label: "Profile",
      icon: <CircleUserRound />,
      path: "/profile",
      roles: ["CLIENT", "FREELANCER"],
    },
    {
      label: "Proposals",
      icon: <UserRoundSearch />,
      path: "/proposals",
      roles: ["FREELANCER"],
    },
  ];

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

      <AppShell.Navbar p="md" className="navbar">
        {menuItems
          .filter((item) => item.roles.includes(authData?.role || ""))
          .map(({ label, icon, path }) => (
            <NavLink
              key={path}
              onClick={() => navigate(path)}
              label={label}
              leftSection={icon}
              active={pathname === path}
            />
          ))}
      </AppShell.Navbar>

      <AppShell.Main className="flex" style={{ backgroundColor: "#f9f9f9" }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
