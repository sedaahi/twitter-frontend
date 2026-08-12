import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllTweets } from "../features/tweets/tweetSlice";

import LeftSidebar from "../components/layout/LeftSidebar";
import RightSidebar from "../components/layout/RightSidebar";
import TweetComposer from "../components/tweet/TweetComposer";
import TweetList from "../components/tweet/TweetList";
import Loading from "../components/common/Loading";

function HomePage() {
  const dispatch = useDispatch();

  const {
    items: tweets,
    loading,
    error,
  } = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(fetchAllTweets());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto flex max-w-7xl">
        <LeftSidebar />

        <main className="min-h-screen w-full max-w-2xl border-r border-gray-200">
          <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 px-5 py-4 backdrop-blur">
            <h1 className="text-xl font-bold">
              Home
            </h1>
          </header>

          <TweetComposer />

          {loading && <Loading />}

          {error && (
            <p className="p-5 text-center text-red-600">
              {error}
            </p>
          )}

          {!loading && !error && (
            <TweetList tweets={tweets} />
          )}
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}

export default HomePage;