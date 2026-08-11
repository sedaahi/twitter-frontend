function TweetCard({ tweet }) {
  return (
    <article className="border-b border-gray-200 px-5 py-4 transition hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-900 font-semibold text-white">
          {tweet.user.username.charAt(0).toUpperCase()}
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

          <p className="mt-2 text-gray-800">
            {tweet.content}
          </p>

          <div className="mt-4 flex gap-8 text-sm text-gray-500">
            <span>🔁 {tweet.retweetCount}</span>

            <span>♡ {tweet.likeCount}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TweetCard;