import axios from "axios";

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Signup API call
export const signupUser = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle error
  }
};

// Login API call
export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Handle error
  }
};

export default api;
