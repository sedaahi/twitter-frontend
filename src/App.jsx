import HomePage from "./pages/HomePage";

function App() {
  return <HomePage />;
}

export default App;

/*
HomePage
   ↓ dispatch
Redux thunk
   ↓
tweetService
   ↓
Spring Boot :3000
   ↓
TweetResponse[]
   ↓
Redux Store
   ↓
HomePage
   ↓
TweetList
   ↓
TweetCard
*/