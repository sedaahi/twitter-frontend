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
Authorization header eklenmez
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

export const getTweetById = async (tweetId) => {
  const response = await fetch(
    `${API_URL}/tweet/findById?id=${tweetId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Tweet alınamadı.");
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

// Kendi tweet'ini güncelle
export const updateTweet = async (tweetId, content) => {
  const response = await fetch(
    `${API_URL}/tweet/${tweetId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        content,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Tweet güncellenemedi.");
  }

  return response.json();
};

// Kendi tweet'ini sil
export const deleteTweet = async (tweetId) => {
  const response = await fetch(
    `${API_URL}/tweet/${tweetId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  // Backend 204 No Content dönüyor.
  if (!response.ok) {
    throw new Error("Tweet silinemedi.");
  }
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

  // response body yok → 204 No Content
  if (!response.ok) {
    throw new Error("Beğeni kaldırılamadı.");
  }
};

export const retweetTweet = async (tweetId) => {
  const response = await fetch(`${API_URL}/retweet`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      tweetId,
    }),
  });

  if (!response.ok) {
    throw new Error("Tweet retweet edilemedi.");
  }
};

export const undoRetweet = async (retweetId) => {
  const response = await fetch(
    `${API_URL}/retweet/${retweetId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Retweet geri alınamadı.");
  }
};

export const getLikedTweetsByUserId = async (userId) => {
  const response = await fetch(
    `${API_URL}/like/user/${userId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Kullanıcının beğenilen tweetleri alınamadı."
    );
  }

  return response.json();
};