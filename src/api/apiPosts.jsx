// api.js
import axios from "axios";

const API_URL = "https://sheetdb.io/api/v1/9ngzl4c5ag5m2";
const API_KEY = ""; // Nếu cần

const instance = axios.create({
  baseURL: API_URL,
  params: {
    sheet: "Posts", // Tên sheet
    apikey: API_KEY, // Nếu dùng API key
  },
});

export default instance;
