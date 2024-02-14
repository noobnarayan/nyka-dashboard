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

export const productService = { getProducts };
