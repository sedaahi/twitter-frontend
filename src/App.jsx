import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import HomePage from "./pages/HomePage";
import TweetDetailPage from "./pages/TweetDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* MAIN APP */}
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/tweet/:tweetId"
          element={<TweetDetailPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;