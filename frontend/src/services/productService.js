import axios from "axios";
import { api_url } from "../config.js";

const getProducts = async (params) => {
  try {
    const response = await axios.get(`${api_url}/api/products`, { params });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const addProduct = async (data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    const res = await axios.post(`${api_url}/api/products`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
const deleteProduct = async (id) => {
  const token = localStorage.getItem("accessToken");

  try {
    const res = await axios.delete(`${api_url}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const productService = { getProducts, addProduct, deleteProduct };
