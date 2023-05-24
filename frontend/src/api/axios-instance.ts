import axios from "axios";
import { USER_TOKEN } from "../constants/keys";

export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}` },
});
