import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import HomePage from "./pages/HomePage";
import TweetDetailPage from "./pages/TweetDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/tweet/:tweetId"
          element={<TweetDetailPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />
      </Route>
    </Routes>
  );
}

export default App;