import axios from "axios";
import API_BASE_URL from "../config/apiConfig";

// Register/Login API
export const loginOrSignup = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/loginreg/`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Verify Code API
export const verifyCode = async (email, code) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify/`, {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch User Data (Optional)
export const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
