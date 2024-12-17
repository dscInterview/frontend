import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  headers: {
    "Content-Type": "application/json",
  },
});


export const signupUser = async (userData) => {
  try {
    console.log("in try block of api.js")
    console.log(userData)
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.log("in catch block of api.js")
    throw error.response ? error.response.data : error.message;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export default api;
