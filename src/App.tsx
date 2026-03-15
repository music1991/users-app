import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import PublicRoute from "./routes/PublicRoute";
import MainLayout from "./layouts/MainLayout";
import UserDetail from "./pages/UserDetail";
import { UserRole } from "./types/user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/profile" element={<Profile />} />

          <Route
            path="/users"
            element={
              <RoleRoute allowedRole={UserRole.Admin}>
                <Users />
              </RoleRoute>
            }
          />

          <Route
            path="/users/:id"
            element={
              <RoleRoute allowedRole={UserRole.Admin}>
                <UserDetail />
              </RoleRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;