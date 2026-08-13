import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  dislikeTweetById,
  likeTweetById,
  retweetTweetById,
  undoRetweetById,
} from "../../features/tweets/tweetSlice";

import ReplyModal from "../comment/ReplyModal";

function TweetCard({ tweet, clickable = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showReplyModal, setShowReplyModal] = useState(false);

  const username = tweet.user.username;

  const handleLikeToggle = () => {
    if (tweet.likedByCurrentUser) {
      dispatch(dislikeTweetById(tweet.id));
    } else {
      dispatch(likeTweetById(tweet.id));
    }
  };

  const handleRetweetToggle = () => {
    if (tweet.retweetedByCurrentUser) {
      dispatch(
        undoRetweetById(tweet.currentUserRetweetId)
      );
    } else {
      dispatch(retweetTweetById(tweet.id));
    }
  };

  const handleTweetClick = () => {
    if (clickable) {
      navigate(`/tweet/${tweet.id}`);
    }
  };

  return (
    <article
      onClick={handleTweetClick}
      className={`border-b border-gray-200 px-5 py-4 transition ${
        clickable
          ? "cursor-pointer hover:bg-gray-50"
          : ""
      }`}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-900 font-semibold text-white">
          {username.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          {/* User */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">
              {username}
            </span>

            <span className="text-sm text-gray-500">
              @{username}
            </span>
          </div>

          {/* Tweet content */}
          <p className="mt-1 whitespace-pre-wrap text-[15px] leading-5 text-gray-900">
            {tweet.content}
          </p>

          {/* Actions */}
          <div className="mt-4 flex max-w-md justify-between text-sm text-gray-500">
            {/* Comment */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setShowReplyModal(true);
              }}
              className="flex items-center gap-2 text-gray-500 transition hover:text-blue-500"
            >
              <i className="fa-regular fa-comment"></i>

              {tweet.commentCount > 0 && (
                <span>{tweet.commentCount}</span>
              )}
            </button>

            {/* Retweet */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleRetweetToggle();
              }}
              className={`flex items-center gap-2 transition ${
                tweet.retweetedByCurrentUser
                  ? "text-green-500"
                  : "text-gray-500 hover:text-green-500"
              }`}
            >
              <span>↻</span>

              {tweet.retweetCount > 0 && (
                <span>{tweet.retweetCount}</span>
              )}
            </button>

            {/* Like */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleLikeToggle();
              }}
              className={`flex items-center gap-2 transition ${
                tweet.likedByCurrentUser
                  ? "text-pink-500"
                  : "text-gray-500 hover:text-pink-500"
              }`}
            >
              <span>
                {tweet.likedByCurrentUser ? "♥" : "♡"}
              </span>

              {tweet.likeCount > 0 && (
                <span>{tweet.likeCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {showReplyModal && (
        <ReplyModal
          tweet={tweet}
          onClose={() => setShowReplyModal(false)}
        />
      )}
    </article>
  );
}

export default TweetCard;