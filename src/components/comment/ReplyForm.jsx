import { useState } from "react";
import { useDispatch } from "react-redux";

import { addComment } from "../../features/comments/commentSlice";

const getCurrentUserEmail = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(
      atob(
        token
          .split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    );

    return payload.sub;
  } catch {
    return null;
  }
};

function ReplyForm({ tweetId }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const currentUserEmail = getCurrentUserEmail();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    const result = await dispatch(
      addComment({
        tweetId,
        content: trimmedContent,
      })
    );

    if (addComment.fulfilled.match(result)) {
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-start gap-3 border-b border-gray-200 px-5 py-4"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
        {currentUserEmail
          ? currentUserEmail.charAt(0).toUpperCase()
          : "Y"}
      </div>

      <div className="flex-1">
        <textarea
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder="Post your reply"
          maxLength={280}
          rows={2}
          className="w-full resize-none border-none bg-transparent text-base outline-none placeholder:text-gray-500"
        />

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {content.length}/280
          </span>

          <button
            type="submit"
            disabled={!content.trim()}
            className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reply
          </button>
        </div>
      </div>
    </form>
  );
}

export default ReplyForm;