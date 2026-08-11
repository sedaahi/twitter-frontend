import TweetCard from "./TweetCard";

function TweetList({ tweets }) {
  if (tweets.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">
        Henüz tweet bulunmuyor.
      </p>
    );
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
        />
      ))}
    </div>
  );
}

export default TweetList;