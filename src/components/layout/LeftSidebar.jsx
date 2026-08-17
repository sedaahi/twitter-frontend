import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/authSlice";

function LeftSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-200 px-4 py-5 lg:block">
      <div className="sticky top-0">
        <div className="mb-8 text-3xl font-bold">
          𝕏
        </div>

        <nav className="space-y-2">
          {/* HOME */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex w-full items-center gap-5 rounded-full px-3 py-3 text-lg font-medium transition hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
          >
            <i className="fa-solid fa-house w-7 text-center text-2xl"></i>
            <span>Home</span>
          </button>

          {/* EXPLORE */}
          <button
            type="button"
            className="flex w-full items-center gap-5 rounded-full px-3 py-3 text-lg font-medium transition hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
          >
            <i className="fa-solid fa-magnifying-glass w-7 text-center text-2xl"></i>
            <span>Explore</span>
          </button>

          {/* PROFILE */}
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex w-full items-center gap-5 rounded-full px-3 py-3 text-lg font-medium transition hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
          >
            <i className="fa-regular fa-user w-7 text-center text-2xl"></i>
            <span>Profile</span>
          </button>
        </nav>

        <button
          type="button"
          className="mt-6 w-full rounded-full bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          Post
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 flex w-full items-center justify-center rounded-full border border-gray-300 py-3 font-semibold transition hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default LeftSidebar;
