import { Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import UsersPage from "../pages/UsersPage";
import ProfilePage from "../pages/ProfilePage";
import ProposalsPage from "../pages/ProposalsPage";
import JobsPage from "../pages/job/JobsPage";
import SignUpPage from "../pages/SignUpPage";

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
          path="/sign-up"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
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
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/proposals" element={<ProposalsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Route>
      </Routes>
    </div>
  );
};

export default Content;
