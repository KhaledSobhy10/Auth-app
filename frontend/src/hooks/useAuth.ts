import { useEffect, useState } from "react";
import { useFetch } from "./fetch";

const url = import.meta.env.VITE_BACKEND_URL + "/auth/verify-token";
export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [reCheckCount, setReCheckCount] = useState(0);
  const { state, makeRequest } = useFetch();
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) makeRequest({ url, method: "POST", data: { token } });
    else setIsLoggedIn(false);
  }, [reCheckCount]);

  useEffect(() => {
    if (state?.response) {
      const { success } = state.response;
      if (success) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("user_token");
        setIsLoggedIn(false);
      }
    }
  }, [state]);

  function reCheck() {
    setReCheckCount((prev) => prev + 1);
  }

  return { isLoggedIn, reCheck };
}
