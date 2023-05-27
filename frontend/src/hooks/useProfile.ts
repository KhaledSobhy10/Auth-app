import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios-instance";
import { getAuthHeader } from "../api/headers";
import axios from "axios";

export function useProfile(){

  const queryProfile = useQuery({
    queryKey: ["/profile"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/profile",{headers:getAuthHeader()});
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) { if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          throw error.response.data
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          throw error

        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          throw error

        }}
       
      }
    },
  });


  return queryProfile;
}