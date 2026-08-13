import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  editComment,
  removeComment,
} from "../../features/comments/commentSlice";

function CommentItem({
  comment,
  tweetId,
  tweetOwnerEmail,
  currentUserEmail,
}) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(
    comment.content
  );

  const isCommentOwner =
    comment.user.email === currentUserEmail;

  const isTweetOwner =
    tweetOwnerEmail === currentUserEmail;

  const canDelete =
    isCommentOwner || isTweetOwner;

  const handleEditSave = async () => {
    const trimmedContent = editContent.trim();

    if (!trimmedContent) {
      return;
    }

    const result = await dispatch(
      editComment({
        tweetId,
        commentId: comment.id,
        content: trimmedContent,
      })
    );

    if (editComment.fulfilled.match(result)) {
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(
      removeComment({
        tweetId,
        commentId: comment.id,
      })
    );
  };

  return (
    <article className="border-b border-gray-200 px-5 py-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
          {comment.user.username
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-900">
              {comment.user.username}
            </span>

            <span className="text-gray-500">
              @{comment.user.username}
            </span>
          </div>

          {isEditing ? (
            <div className="mt-2">
              <textarea
                value={editContent}
                onChange={(event) =>
                  setEditContent(event.target.value)
                }
                maxLength={280}
                rows={2}
                className="w-full resize-none rounded-lg border border-gray-200 p-2 text-sm outline-none focus:border-blue-400"
              />

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleEditSave}
                  disabled={!editContent.trim()}
                  className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white disabled:opacity-40"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(comment.content);
                  }}
                  className="rounded-full px-3 py-1 text-xs text-gray-500 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-1 text-sm text-gray-800">
                {comment.content}
              </p>

              <div className="mt-2 flex gap-4 text-xs text-gray-400">
                {isCommentOwner && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="transition hover:text-blue-500"
                  >
                    Edit
                  </button>
                )}

                {canDelete && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="transition hover:text-red-500"
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default CommentItem;