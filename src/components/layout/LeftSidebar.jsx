function LeftSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-200 px-4 py-5 lg:block">
      <div className="sticky top-0">
        <div className="mb-8 text-3xl font-bold">
          𝕏
        </div>

        <nav className="space-y-2">
          <button className="flex w-full items-center gap-4 rounded-full px-4 py-3 text-lg font-medium hover:bg-gray-100">
            <span>⌂</span>
            <span>Home</span>
          </button>

          <button className="flex w-full items-center gap-4 rounded-full px-4 py-3 text-lg font-medium hover:bg-gray-100">
            <span>⌕</span>
            <span>Explore</span>
          </button>

          <button className="flex w-full items-center gap-4 rounded-full px-4 py-3 text-lg font-medium hover:bg-gray-100">
            <span>♙</span>
            <span>Profile</span>
          </button>
        </nav>

        <button className="mt-6 w-full rounded-full bg-black py-3 font-semibold text-white transition hover:bg-gray-800">
          Post
        </button>
      </div>
    </aside>
  );
}

export default LeftSidebar;