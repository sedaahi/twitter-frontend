import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllTweets } from "../features/tweets/tweetSlice";
import TweetList from "../components/TweetList";
import Loading from "../components/Loading";

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
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto min-h-screen max-w-2xl border-x border-gray-200 bg-white">
        <header className="border-b border-gray-200 px-5 py-4">
          <h1 className="text-xl font-bold text-gray-900">
            Home
          </h1>
        </header>

        {loading && <Loading />}

        {error && (
          <p className="p-5 text-center text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <TweetList tweets={tweets} />
        )}
      </div>
    </main>
  );
}

export default HomePage;