import { RegisterDto } from "@/schema/auth";
import axios from "axios";

const API_URL = "https://backend-challenge-base-main.onrender.com/api/v1";


export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Register function to create a new user
export const registerUser = async (data: RegisterDto): Promise<any> => {
  
  try {
    const response = await apiClient.post("/auth/register", data);
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error during registration:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Registration failed.");
    } else {
      console.error("Unexpected error during registration:", error);
      throw new Error("An unexpected error occurred."); 
    }
  }
};
