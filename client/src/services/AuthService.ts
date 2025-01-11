import axios from "axios";
import User from "../types/user";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const AuthService = {
  login: async (
    username: string,
    password: string
  ): Promise<{ token: string; user: User }> => {
    const data = (
      await axios.post(`${BASE_URL}/auth/login`, {
        username: username,
        password: password,
      })
    ).data;

    return data;
  },
  register: async (email: string, username: string, password: string) => {
    await axios.post(`${BASE_URL}/auth/register`, {
      email: email,
      username: username,
      password: password,
    });
  },
  verifyEmail: async (token: string) => {
    await axios.post(`${BASE_URL}/auth/verify-email`, {
      token: token,
    });
  },
  cancelVerification: async (token: string) => {
    await axios.post(`${BASE_URL}/auth/cancel-verification`, {
      token: token,
    });
  },
  resendVerificationEmail: async (username: string) => {
    await axios.post(`${BASE_URL}/auth/resend-verification-email`, {
      username: username,
    });
  },
};

export default AuthService;
