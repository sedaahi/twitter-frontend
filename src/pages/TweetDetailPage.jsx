import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  fetchTweetById,
} from "../features/tweets/tweetSlice";

import {
  fetchCommentsByTweetId,
} from "../features/comments/commentSlice";

import TweetCard from "../components/tweet/TweetCard";
import ReplyForm from "../components/comment/ReplyForm";
import CommentList from "../components/comment/CommentList";
import Loading from "../components/common/Loading";

function TweetDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tweetId } = useParams();

  const {
    selectedTweet,
    detailLoading,
    error,
  } = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(fetchTweetById(Number(tweetId)));

    dispatch(
      fetchCommentsByTweetId(Number(tweetId))
    );
  }, [dispatch, tweetId]);

  if (detailLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <p className="p-5 text-center text-red-500">
        {error}
      </p>
    );
  }

  if (!selectedTweet) {
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

        <h1 className="text-xl font-bold">
          Post
        </h1>
      </header>


      {/* Tıklanan Tweet */}
      <TweetCard tweet={selectedTweet} />


      {/* Tweet'e direkt reply yazma */}
      <ReplyForm
        tweetId={selectedTweet.id}
      />


      {/* Tweet'e ait yorumlar */}
      <CommentList
        tweetId={selectedTweet.id}
        tweetOwnerEmail={selectedTweet.user.email}
      />
    </>
  );
}


export default TweetDetailPage;