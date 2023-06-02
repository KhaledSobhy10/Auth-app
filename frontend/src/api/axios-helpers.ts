import { AxiosError } from "axios";

export const errorFormat = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw error.response.data;
  } else if (error.request) {
    // The request was made but no response was received
    throw error;
  } else {
    // Something happened in setting up the request that triggered an Error
    throw error.message;
  }
};
