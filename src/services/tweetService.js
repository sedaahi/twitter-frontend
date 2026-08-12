const API_URL = "http://localhost:3000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

    /*
    token varsa
        ↓
        Authorization: Bearer <token>

    token yoksa
        ↓
        Authorization header ekleme
      */

export const getAllTweets = async () => {
  const response = await fetch(`${API_URL}/tweet`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Tweetler alınamadı.");
  }

  return response.json();
};

export const getTweetsByUserId = async (userId) => {
  const response = await fetch(
    `${API_URL}/tweet/findByUserId?userId=${userId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Kullanıcının tweetleri alınamadı.");
  }

  return response.json();
};

export const createTweet = async (content) => {
  const response = await fetch(`${API_URL}/tweet`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    throw new Error("Tweet oluşturulamadı.");
  }

  return response.json();
};
export const likeTweet = async (tweetId) => {
  const response = await fetch(`${API_URL}/like`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      tweetId,
    }),
  });

  if (!response.ok) {
    throw new Error("Tweet beğenilemedi.");
  }
};

export const dislikeTweet = async (tweetId) => {
  const response = await fetch(`${API_URL}/dislike`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      tweetId,
    }),
  });
//response body yok-204 no content döner
  if (!response.ok) {
    throw new Error("Beğeni kaldırılamadı.");
  }
};
