import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  dislikeTweetById,
  editTweet,
  likeTweetById,
  removeTweet,
  retweetTweetById,
  undoRetweetById,
} from "../../features/tweets/tweetSlice";

import ReplyModal from "../comment/ReplyModal";

function TweetCard({ tweet, clickable = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const [showReplyModal, setShowReplyModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [editContent, setEditContent] = useState(
    tweet.content
  );

  const username = tweet.user.username;

  //true=> Edit/Delete buttons are visible, false=> not visible
  const isTweetOwner =
    currentUser?.id === tweet.user.id;  

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
    if (clickable && !isEditing) {
      navigate(`/tweet/${tweet.id}`);
    }
  };

  const handleEdit = (event) => {
    event.stopPropagation();

    setEditContent(tweet.content);
    setIsEditing(true);
  };

  const handleEditCancel = (event) => {
    event.stopPropagation();

    setEditContent(tweet.content);
    setIsEditing(false);
  };

  const handleEditSave = async (event) => {
    event.stopPropagation();

    const trimmedContent = editContent.trim();

    if (!trimmedContent) {
      return;
    }

    const result = await dispatch(
      editTweet({
        tweetId: tweet.id,
        content: trimmedContent,
      })
    );

    if (editTweet.fulfilled.match(result)) {
      setIsEditing(false);
    }
  };

  const handleDelete = async (event) => {
    event.stopPropagation();

    const confirmed = window.confirm(
      "Bu tweet'i silmek istediğine emin misin?"
    );

    if (!confirmed) {
      return;
    }

    const result = await dispatch(
      removeTweet(tweet.id)
    );

    if (
      removeTweet.fulfilled.match(result) &&
      !clickable
    ) {
      navigate("/");
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

          {/* User + owner actions */}
          <div className="flex items-start justify-between gap-3">

            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">
                {username}
              </span>

              <span className="text-sm text-gray-500">
                @{username}
              </span>
            </div>

            {isTweetOwner && !isEditing && (
              <div className="flex gap-3 text-xs">

                <button
                  type="button"
                  onClick={handleEdit}
                  className="text-gray-400 transition hover:text-blue-500"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-gray-400 transition hover:text-red-500"
                >
                  Delete
                </button>

              </div>
            )}
          </div>

          {/* Tweet content / Edit mode */}
          {isEditing ? (
            <div
              className="mt-2"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <textarea
                value={editContent}
                onChange={(event) =>
                  setEditContent(event.target.value)
                }
                maxLength={280}
                rows={3}
                autoFocus
                className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-blue-400"
              />

              <div className="mt-2 flex items-center justify-between">

                <span className="text-xs text-gray-400">
                  {editContent.length}/280
                </span>

                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={handleEditCancel}
                    className="rounded-full px-4 py-1.5 text-sm text-gray-500 transition hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleEditSave}
                    disabled={!editContent.trim()}
                    className="rounded-full bg-black px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-40"
                  >
                    Save
                  </button>

                </div>
              </div>
            </div>
          ) : (
            <p className="mt-1 whitespace-pre-wrap text-[15px] leading-5 text-gray-900">
              {tweet.content}
            </p>
          )}

          {/* Actions */}
          {!isEditing && (
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
                  {tweet.likedByCurrentUser
                    ? "♥"
                    : "♡"}
                </span>

                {tweet.likeCount > 0 && (
                  <span>{tweet.likeCount}</span>
                )}
              </button>

            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && (
        <ReplyModal
          tweet={tweet}
          onClose={() =>
            setShowReplyModal(false)
          }
        />
      )}
    </article>
  );
}

export default TweetCard;