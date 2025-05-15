import { Button } from "@mantine/core";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login("token");
    navigate("/");
  };

  return (
    <div>
      <Button variant="filled" onClick={handleLogin} className="p-7">
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
