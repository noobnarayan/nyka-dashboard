import axios from "axios";
import { api_url } from "../config.js";

async function login(data) {
  try {
    const response = await axios.post(`${api_url}/api/login`, data);
    localStorage.setItem("accessToken", response.data.data.accessToken);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const signup = async (data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    const response = await axios.post(`${api_url}/api/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

async function getCurrentUser() {
  try {
    const res = await axios.get(`${api_url}/api/getUser`, {
      withCredentials: true,
    });
    const userData = res.data.data;
    console.log(userData);
    return userData;
  } catch (error) {
    throw error;
  }
}

export const authService = {
  login,
  signup,
  getCurrentUser,
};
