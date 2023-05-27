import { useEffect, useState } from "react";
import { USER_TOKEN } from "../constants/keys";
import axiosInstance from "../api/axios-instance";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const url = "/auth/verify-token";
export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const mutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem(USER_TOKEN)
      if(!token) return Promise.reject("No token found")

      
try {
  const res = await axiosInstance.post(url, {
    token,
  });
  return res;
} catch (error) {
  if (axios.isAxiosError(error)) {
     if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw error.response.data
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
    throw error

  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    throw error

  }}
 
}
}
      

  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  useEffect(() => {
    
    if (mutation.isError) {
      setIsLoggedIn(false);
     localStorage.removeItem(USER_TOKEN)
    } else if (mutation.isSuccess) {
      setIsLoggedIn(true);
    }
  }, [mutation.status]);

  function reCheck() {
    mutation.mutate();
  }

  return { isLoggedIn, reCheck };
}
