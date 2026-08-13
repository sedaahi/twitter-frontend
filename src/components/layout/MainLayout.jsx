import { Outlet } from "react-router-dom";

import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto flex max-w-7xl">
        <LeftSidebar />

        <main className="min-h-screen w-full max-w-2xl border-x border-gray-200">
          <Outlet />
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}

export default MainLayout;