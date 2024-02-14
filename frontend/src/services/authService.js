import axios from "axios";
import { api_url } from "../config.js";

async function login(data) {
  try {
    const response = await axios.post(`${api_url}/api/login`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function signup(formState) {
  try {
    const formData = new FormData();
    Object.keys(formState).forEach((key) =>
      formData.append(key, formState[key])
    );
    const response = await axios.post(`${api_url}/api/signup`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

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
