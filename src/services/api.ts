import axios from "axios";

const API_URL = "http://localhost:3000/";

export const apiInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
