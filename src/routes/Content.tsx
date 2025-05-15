import { Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import JobsPage from "../pages/JobsPage";
import PublicRoute from "./PublicRoute";
import UsersPage from "../pages/UsersPage";
import ProfilePage from "../pages/ProfilePage";
import ProposalsPage from "../pages/ProposalsPage";

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
          <Route path="/jobs" index element={<JobsPage />} />
          <Route path="/users" index element={<UsersPage />} />
          <Route path="/proposals" index element={<ProposalsPage />} />
          <Route path="/profile" index element={<ProfilePage />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Route>
      </Routes>
    </div>
  );
};

export default Content;
