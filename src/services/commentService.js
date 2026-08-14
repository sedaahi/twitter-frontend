const API_URL = "http://localhost:3000/comment";

const getToken = () => localStorage.getItem("token");

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const getCommentsByTweetId = async (tweetId) => {
  const response = await fetch(`${API_URL}/tweet/${tweetId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Comments could not be fetched.");
  }

  return response.json();
};

export const createComment = async (tweetId, content) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      tweetId,
      content,
    }),
  });

  if (!response.ok) {
    throw new Error("Comment could not be created.");
  }

  return response.json();
};

export const updateComment = async (
  commentId,
  tweetId,
  content
) => {
  const response = await fetch(`${API_URL}/${commentId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      tweetId,
      content,
    }),
  });

  if (!response.ok) {
    throw new Error("Comment could not be updated.");
  }

  return response.json();
};

export const deleteComment = async (commentId) => {
  const response = await fetch(`${API_URL}/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Comment could not be deleted.");
  }
};
