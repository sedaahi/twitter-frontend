import { useState } from "react";
import { useDispatch } from "react-redux";

import { addComment } from "../../features/comments/commentSlice";

function ReplyModal({ tweet, onClose }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    setPosting(true);

    const result = await dispatch(
      addComment({
        tweetId: tweet.id,
        content: trimmedContent,
      })
    );

    setPosting(false);

    if (addComment.fulfilled.match(result)) {
      setContent("");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-20"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl transition hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        {/* Original tweet */}
        <div className="px-5 pt-2">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 font-semibold text-white">
              {tweet.user.username
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {tweet.user.username}
                </span>

                <span className="text-sm text-gray-500">
                  @{tweet.user.username}
                </span>
              </div>

              <p className="mt-1 whitespace-pre-wrap text-sm text-gray-800">
                {tweet.content}
              </p>

              <p className="mt-3 text-sm text-gray-500">
                Replying to{" "}
                <span className="text-blue-500">
                  @{tweet.user.username}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Reply */}
        <form
          onSubmit={handleSubmit}
          className="px-5 pb-4 pt-5"
        >
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
              Y
            </div>

            <div className="flex-1">
              <textarea
                value={content}
                onChange={(event) =>
                  setContent(event.target.value)
                }
                placeholder="Post your reply"
                maxLength={280}
                rows={4}
                autoFocus
                className="w-full resize-none border-none bg-transparent text-lg outline-none placeholder:text-gray-500"
              />

              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-xs text-gray-400">
                  {content.length}/280
                </span>

                <button
                  type="submit"
                  disabled={!content.trim() || posting}
                  className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {posting ? "Replying..." : "Reply"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReplyModal;