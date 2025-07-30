import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MySessions from "./pages/MySessions";
import SessionEditor from "./pages/SessionEditor";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function ProtectedRoute({ children }) {
  const { token, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated() && token ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { token, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated() && token ? <Navigate to="/dashboard" /> : children;
}

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

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
          path="/dashboard"
          element={

            <Dashboard />

          }
        />

        <Route
          path="/my-sessions"
          element={
            <ProtectedRoute>
              <MySessions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor/:id?"
          element={
            <ProtectedRoute>
              <SessionEditor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
