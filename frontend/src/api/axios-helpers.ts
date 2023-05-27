import { AxiosError } from "axios";

export const errorFormat = (error:AxiosError)=>{
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        throw error;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        throw error.message;
      }
}