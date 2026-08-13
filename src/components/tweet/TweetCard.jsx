import { useDispatch } from "react-redux";

import {
  dislikeTweetById,
  likeTweetById,
  retweetTweetById,
  undoRetweetById,
} from "../../features/tweets/tweetSlice";

function TweetCard({ tweet }) {
  const dispatch = useDispatch();

  const username = tweet.user.username;

  const handleLikeToggle = () => {
    if (tweet.likedByCurrentUser) {
      dispatch(dislikeTweetById(tweet.id));
    } else {
      dispatch(likeTweetById(tweet.id));
    }
  };

  const handleRetweetToggle = () => {
    if (tweet.retweetedByCurrentUser) { //true=> Ben bunu daha önce retweet etmişim
      dispatch(
        undoRetweetById(tweet.currentUserRetweetId) //=>→ DELETE
      );
    } else { //=> Retweet etmemişim
      dispatch(retweetTweetById(tweet.id)); //=>POST
    }
  };

  return (
    <article className="border-b border-gray-200 px-5 py-4 transition hover:bg-gray-50">
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-900 font-semibold text-white">
          {username.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">
              {username}
            </span>

            <span className="text-sm text-gray-500">
              @{username}
            </span>
          </div>

          <p className="mt-1 whitespace-pre-wrap text-[15px] leading-5 text-gray-900">
            {tweet.content}
          </p>

          <div className="mt-4 flex max-w-md justify-between text-sm text-gray-500">
            <button className="flex items-center gap-2 transition hover:text-blue-500">
              <span>◯</span>
              <span>0</span>
            </button>

            <button
              onClick={handleRetweetToggle}
              className={`flex items-center gap-2 transition ${tweet.retweetedByCurrentUser
                  ? "text-green-500"
                  : "text-gray-500 hover:text-green-500"
                }`}
            >
              <span>↻</span>
              <span>{tweet.retweetCount}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLikeToggle}
                className={`flex items-center gap-2 transition ${tweet.likedByCurrentUser
                  ? "text-pink-500"
                  : "text-gray-500 hover:text-pink-500"
                  }`}
              >
                <span>
                  {tweet.likedByCurrentUser ? "♥" : "♡"}
                </span>

                <span>{tweet.likeCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TweetCard;