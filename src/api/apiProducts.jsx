// api.js
import axios from "axios";

const API_URL = "https://sheetdb.io/api/v1/rwc4yao2xhsdu";
const API_KEY = ""; // Nếu cần

const instance = axios.create({
  baseURL: API_URL,
  params: {
    sheet: "Products", // Tên sheet
    apikey: API_KEY, // Nếu dùng API key
  },
});

export default instance;
