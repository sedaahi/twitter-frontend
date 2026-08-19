import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTweet } from "../../features/tweets/tweetSlice";

function TweetComposer() {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const posting = useSelector(
    (state) => state.tweets.posting
  );

  const maxLength = 280;

  const handleSubmit = async () => {
    if (!content.trim()) {
      return;
    }

    const result = await dispatch(
      addTweet(content.trim())
    );

    if (addTweet.fulfilled.match(result)) {
      setContent("");
    }
  };

  return (
    <section className="border-b border-gray-200 px-5 py-4">
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-900 font-semibold text-white">
          S
        </div>

        <div className="flex-1">
          <textarea
          id="tweet-composer"
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            maxLength={maxLength}
            placeholder="What is happening?!"
            className="min-h-24 w-full resize-none border-none text-xl outline-none placeholder:text-gray-500"
          />

          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-sm text-gray-500">
              {content.length}/{maxLength}
            </span>

            <button
              onClick={handleSubmit}
              disabled={!content.trim() || posting}
              className="rounded-full bg-black px-5 py-2 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {posting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TweetComposer;