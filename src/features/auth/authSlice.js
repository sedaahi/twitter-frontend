import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
} from "../../services/authService";

// LocalStorage'daki kullanıcıyı güvenli şekilde oku.
const getStoredUser = () => {
  const storedUser = localStorage.getItem("user"); // LocalStorage'dan kullanıcıyı al

  /**
   * {
  "id": 1,
  "username": "seda",
  "email": "seda@example.com"
}
   */
  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      return await loginUser(email, password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    { username, email, password },
    thunkAPI
  ) => {
    try {
      return await registerUser(
        username,
        email,
        password
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token"), // LocalStorage'dan token'ı al
  user: getStoredUser(), //Sayfayı yenilediğinde Redux yeniden oluşturulurken çalışacak ve kullanıcı tekrar Redux'a alınacak
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem(
          "token",
          action.payload.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;