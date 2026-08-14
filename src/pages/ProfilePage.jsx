import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchTweetsByUserId } from "../features/tweets/tweetSlice";

import TweetList from "../components/tweet/TweetList";
import Loading from "../components/common/Loading";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.user
  );

  const {
    items: tweets,
    loading,
    error,
  } = useSelector((state) => state.tweets);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTweetsByUserId(user.id));
    }
  }, [dispatch, user]);

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-5 border-b border-gray-200 bg-white/90 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100"
        >
          ←
        </button>

        <div>
          <h1 className="text-xl font-bold">
            {user.username}
          </h1>

          <p className="text-xs text-gray-500">
            {tweets.length} posts
          </p>
        </div>
      </header>

      {/* Cover */}
      <div className="h-36 bg-gray-200" />

      {/* Profile info */}
      <section className="border-b border-gray-200 px-5 pb-5">
        <div className="-mt-10 flex items-end justify-between">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gray-900 text-2xl font-bold text-white">
            {user.username
              .charAt(0)
              .toUpperCase()}
          </div>

          <button
            type="button"
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-gray-100"
          >
            Edit profile
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold">
            {user.username}
          </h2>

          <p className="text-sm text-gray-500">
            @{user.username}
          </p>

          <p className="mt-3 text-sm text-gray-600">
            {user.email}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          className="flex-1 border-b-2 border-blue-500 py-4 text-sm font-semibold"
        >
          Posts
        </button>

        <button
          type="button"
          className="flex-1 py-4 text-sm text-gray-500"
        >
          Replies
        </button>

        <button
          type="button"
          className="flex-1 py-4 text-sm text-gray-500"
        >
          Likes
        </button>
      </div>

      {/* Tweets */}
      {loading && <Loading />}

      {error && (
        <p className="p-5 text-center text-red-500">
          {error}
        </p>
      )}

      {!loading && !error && (
        <TweetList tweets={tweets} />
      )}
    </>
  );
}

export default ProfilePage;