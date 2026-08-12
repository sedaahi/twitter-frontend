function RightSidebar() {
  return (
    <aside className="hidden w-80 shrink-0 px-6 py-4 xl:block">
      <div className="sticky top-4 space-y-4">
        <div className="rounded-full bg-gray-100 px-4 py-3 text-sm text-gray-500">
          Search
        </div>

        <section className="rounded-2xl border border-gray-200 p-4">
          <h2 className="mb-4 text-xl font-bold">
            What’s happening
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-xs text-gray-500">
                Trending in Türkiye
              </p>
              <p className="font-semibold">
                #SpringBoot
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Technology · Trending
              </p>
              <p className="font-semibold">
                React
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Development · Trending
              </p>
              <p className="font-semibold">
                Java
              </p>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}

export default RightSidebar;