import { useEffect, useState } from "react";
import { USER_TOKEN } from "../constants/keys";
import axiosInstance from "../api/axios-instance";
import { useMutation } from "@tanstack/react-query";
const url = "/auth/verify-token";
export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const mutation = useMutation({
    mutationFn: () => {
      return axiosInstance.post(url, {
        token: localStorage.getItem(USER_TOKEN),
      });
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  useEffect(() => {
    if (mutation.isError) {
      setIsLoggedIn(false);
    } else if (mutation.isSuccess) {
      setIsLoggedIn(true);
    }
  }, [mutation.status]);

  function reCheck() {
    mutation.mutate();
  }

  return { isLoggedIn, reCheck };
}
