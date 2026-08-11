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

