const API_URL = "http://localhost:3000";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Email veya şifre hatalı.");
  }

  return response.json();
};

export const registerUser = async (
  username,
  email,
  password
) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Kayıt işlemi başarısız.");
  }

  return response.json();
};