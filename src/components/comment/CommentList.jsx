import { useSelector } from "react-redux";

import CommentItem from "./CommentItem";

const EMPTY_COMMENTS = [];

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

function CommentList({
  tweetId,
  tweetOwnerEmail,
}) {
  const currentUserEmail = getCurrentUserEmail();

  const tweetComments = useSelector(
    (state) => state.comments.byTweetId[tweetId]
  );

  const comments =
    tweetComments ?? EMPTY_COMMENTS;

  const loading = useSelector(
    (state) =>
      state.comments.loadingByTweetId[tweetId] ??
      false
  );

  if (loading) {
    return (
      <p className="p-5 text-sm text-gray-500">
        Loading replies...
      </p>
    );
  }

  if (comments.length === 0) {
    return (
      <p className="p-5 text-sm text-gray-400">
        No replies yet.
      </p>
    );
  }

  return (
    <section>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          tweetId={tweetId}
          tweetOwnerEmail={tweetOwnerEmail}
          currentUserEmail={currentUserEmail}
        />
      ))}
    </section>
  );
}

export default CommentList;