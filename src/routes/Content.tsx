import { Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import JobsPage from "../pages/JobsPage";
import PublicRoute from "./PublicRoute";

const Content = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<JobsPage />} />
        </Route>

        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
};

export default Content;
