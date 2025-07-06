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
import UnauthorizedPage from "../pages/UnauthorizedPage";
import { ROLES } from "../constants/roles";

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
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route
            path="jobs"
            element={
              <PrivateRoute
                allowedRoles={[
                  ROLES.ADMINISTRATOR,
                  ROLES.CLIENT,
                  ROLES.FREELANCER,
                ]}
              >
                <JobsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute allowedRoles={[ROLES.ADMINISTRATOR]}>
                <UsersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="proposals"
            element={
              <PrivateRoute allowedRoles={[ROLES.FREELANCER]}>
                <ProposalsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute allowedRoles={[ROLES.CLIENT, ROLES.FREELANCER]}>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<p>Not Found</p>} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Content;
