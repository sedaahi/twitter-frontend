import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import TweetDetailPage from "./pages/TweetDetailPage";

function App() {
  return (
    <Routes>
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