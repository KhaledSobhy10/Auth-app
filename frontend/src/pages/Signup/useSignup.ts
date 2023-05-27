import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axios-instance";
import axios from "axios";

import { SignUpInputs } from ".";
import { errorFormat } from "../../api/axios-helpers";

const URL = "/profile";

export function useSignup() {
  const mutation = useMutation({
    mutationFn: async (data: SignUpInputs) => {
      try {
        const res = await axiosInstance.post(URL, data);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorFormat(error);
        } else {
          throw error;
        }
      }
    },
  });

  return mutation;
}
