import axios from "axios";
import { Product } from "../interfaces/Product";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};
