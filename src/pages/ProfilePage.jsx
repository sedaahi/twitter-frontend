import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  fetchLikedTweetsByUserId,
  fetchTweetsByUserId,
} from "../features/tweets/tweetSlice";

import {
  fetchCommentsByUserId,
} from "../features/comments/commentSlice";

import TweetList from "../components/tweet/TweetList";
import Loading from "../components/common/Loading";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("posts");

  const user = useSelector(
    (state) => state.auth.user
  );

const {
  items: tweets,
  likedTweets,
  loading,
  likedTweetsLoading,
  error: tweetError,
  likedTweetsError,
} = useSelector(
  (state) => state.tweets
);

  const {
    userComments,
    userCommentsLoading,
    error: commentError,
  } = useSelector(
    (state) => state.comments
  );

useEffect(() => {
  if (!user?.id) {
    return;
  }

  if (activeTab === "posts") {
    dispatch(
      fetchTweetsByUserId(user.id)
    );
  }

  if (activeTab === "replies") {
    dispatch(
      fetchCommentsByUserId(user.id)
    );
  }

  if (activeTab === "likes") {
    dispatch(
      fetchLikedTweetsByUserId(user.id)
    );
  }
}, [
  dispatch,
  user,
  activeTab,
]);

  if (!user) {
    return null;
  }

  return (
    <>
      {/* HEADER */}
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


      {/* COVER */}
      <div className="h-36 bg-gray-200" />


      {/* PROFILE INFO */}
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


      {/* TABS */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() =>
            setActiveTab("posts")
          }
          className={`flex-1 py-4 text-sm ${
            activeTab === "posts"
              ? "border-b-2 border-blue-500 font-semibold text-gray-900"
              : "text-gray-500"
          }`}
        >
          Posts
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveTab("replies")
          }
          className={`flex-1 py-4 text-sm ${
            activeTab === "replies"
              ? "border-b-2 border-blue-500 font-semibold text-gray-900"
              : "text-gray-500"
          }`}
        >
          Replies
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveTab("likes")
          }
          className={`flex-1 py-4 text-sm ${
            activeTab === "likes"
              ? "border-b-2 border-blue-500 font-semibold text-gray-900"
              : "text-gray-500"
          }`}
        >
          Likes
        </button>
      </div>


      {/* POSTS */}
      {activeTab === "posts" && (
        <>
          {loading && <Loading />}

          {tweetError && (
            <p className="p-5 text-center text-red-500">
              {tweetError}
            </p>
          )}

          {!loading &&
            !tweetError && (
              <TweetList
                tweets={tweets}
              />
            )}
        </>
      )}


      {/* REPLIES */}
      {activeTab === "replies" && (
        <>
          {userCommentsLoading && (
            <Loading />
          )}

          {commentError && (
            <p className="p-5 text-center text-red-500">
              {commentError}
            </p>
          )}

          {!userCommentsLoading &&
            !commentError &&
            userComments.length === 0 && (
              <p className="p-5 text-center text-sm text-gray-500">
                No replies yet.
              </p>
            )}

          {!userCommentsLoading &&
            !commentError &&
            userComments.map(
              (comment) => (
                <article
                  key={comment.id}
                  onClick={() =>
                    navigate(
                      `/tweet/${comment.tweetId}`
                    )
                  }
                  className="cursor-pointer border-b border-gray-200 px-5 py-4 transition hover:bg-gray-50"
                >
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                      {comment.user.username
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold text-gray-900">
                          {
                            comment.user
                              .username
                          }
                        </span>

                        <span className="text-gray-500">
                          @
                          {
                            comment.user
                              .username
                          }
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-gray-800">
                        {comment.content}
                      </p>

                      <p className="mt-2 text-xs text-gray-400">
                        Reply to post #
                        {comment.tweetId}
                      </p>
                    </div>
                  </div>
                </article>
              )
            )}
        </>
      )}


      {/* LIKES */}
{activeTab === "likes" && (
  <>
    {likedTweetsLoading && <Loading />}

    {likedTweetsError && (
      <p className="p-5 text-center text-red-500">
        {likedTweetsError}
      </p>
    )}

    {!likedTweetsLoading &&
      !likedTweetsError &&
      likedTweets.length === 0 && (
        <p className="p-5 text-center text-sm text-gray-500">
          No liked posts yet.
        </p>
      )}

    {!likedTweetsLoading &&
      !likedTweetsError &&
      likedTweets.length > 0 && (
        <TweetList tweets={likedTweets} />
      )}
  </>
)}
    </>
  );
}

export default ProfilePage;