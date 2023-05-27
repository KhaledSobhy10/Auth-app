import emailIcon from "@/assets/icons/mail.svg";
import lockIcon from "@/assets/icons/lock-closed.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/assets/icons/logo.svg";

import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axios-instance";
import axios from "axios";
import { toast } from "react-hot-toast";
import { USER_TOKEN } from "../../constants/keys";
import { passwordRegex } from "../../util/common-regex";
import { FormError } from "../../Types/errors";

interface ISignUpProps {
  reCheck: () => void;
}

const schema = z.object({
  email: z.string().email("Invalid Email !"),
  password: z.string().regex(passwordRegex, "Weak Password !"),
});

type FormData = z.infer<typeof schema>;

const SignUp: React.FunctionComponent<ISignUpProps> = (props: ISignUpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const URL = "/profile";
  const notifyError = (message: string) =>
    toast.error(message, { id: "error-toast" });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      try {
        const res = await axiosInstance.post(URL, data);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
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
      }
    },
    onError(error: FormError, variables, context) {
      notifyError(error.message || "Error !!");
      if (error.errors) {
        const errors = error.errors as {
          key: "email" | "password";
          message: string;
        }[];
        errors.forEach((error) => {
          setError(error.key, { type: "custom", message: error.message });
        });
      }
    },
    onSuccess(response, variables, context) {
      if (response && response.success && response.data.token) {
        localStorage.setItem(USER_TOKEN, response.data.token);
        toast.success("Logged successfully");
        setTimeout(() => {
          props.reCheck();
        }, 1000);
      }
    },
  });

  const registerProfile = (data: FormData) => {
    mutation.mutate(data);
  };

  const onsubmit: SubmitHandler<FormData> = (data) => {
    registerProfile(data);
  };

  return (
    <main className="flex min-h-screen w-screen items-center justify-center bg-white">
      <div className="m-1 w-11/12 rounded-3xl border border-borderColor px-6 py-5 sm:w-[450px] sm:px-12 sm:py-10">
        <div>
          <img src={logo} />
        </div>
        <h1 className="mt-8 text-lg font-semibold text-primaryText">
          Join thousands of learners from around the world
        </h1>
        <h2 className="font mt-3 text-primaryText">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </h2>

        <form
          className="mt-8 flex flex-col gap-7"
          onSubmit={handleSubmit(onsubmit)}
          noValidate
        >
          <div
            className={` border ${
              errors?.email ? "border-pink-600 " : "border-borderColor "
            } relative flex gap-3 rounded-xl p-3 `}
          >
            <div className="absolute right-0 top-full text-sm text-pink-700">
              {errors?.email?.message}
            </div>
            <img src={emailIcon} className="w-5 " />
            <input
              className={` flex-1 text-primaryText placeholder-secondaryText outline-none `}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
          </div>

          <div
            className={` border ${
              errors?.password ? "border-pink-600 " : "border-borderColor "
            } relative flex gap-3 rounded-xl p-3 `}
          >
            <div className="absolute right-0 top-full text-sm text-pink-700">
              {errors?.password?.message}
            </div>

            <img src={lockIcon} className="w-5 " />
            <input
              className="flex-1 text-primaryText placeholder-secondaryText outline-none"
              type="text"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <button
            className="flex items-center justify-center gap-4 rounded-xl bg-accent py-2 text-white disabled:opacity-50"
            disabled={mutation.isLoading}
          >
            Start coding now
            {mutation.isLoading && (
              <div
                className=" inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </form>
        <div className="mx-auto mt-8 text-center text-sm text-secondaryText">
          Adready a member?
          <Link to={"/login"} className="text-accent">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
