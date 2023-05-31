import emailIcon from "@/assets/icons/mail.svg";
import lockIcon from "@/assets/icons/lock-closed.svg";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/assets/icons/logo.svg";

import * as z from "zod";
import { toast } from "react-hot-toast";
import { USER_TOKEN } from "../../constants/keys";
import { passwordRegex } from "../../util/common-regex";
import { FormError } from "../../Types/errors";
import { useLogin } from "./useLogin";
import { useEffect } from "react";
import { REGISTER } from "../../constants/routes";
import googleLogo from "../../assets/icons/logo-google.svg";
import gitLogo from "../../assets/icons/logo-github.svg";
import faceLogo from "../../assets/icons/logo-facebook.svg";
interface ILoginProps {
  reCheck: () => void;
}

const schema = z.object({
  email: z.string().email("Invalid Email !"),
  password: z.string().regex(passwordRegex, "Weak Password !"),
});

export type LoginInputs = z.infer<typeof schema>;

const Login: React.FunctionComponent<ILoginProps> = (props: ILoginProps) => {


  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInputs>({
    resolver: zodResolver(schema),
  });

  const { error, isLoading, data, mutate } = useLogin();

  useEffect(() => {
    if (error) {
      const myError = error as FormError;
      toast.error(myError.message || "Error !!", {
        id: myError.message || "Error !!",
      });
      if (myError.errors) {
        const errors = myError.errors as {
          key: "email" | "password";
          message: string;
        }[];
        errors.forEach((error) => {
          setError(error.key, { type: "custom", message: error.message });
        });
      }
    }
  }, [error]);

  useEffect(() => {
    if (data && data.success && data.data.token) {
      localStorage.setItem(USER_TOKEN, data.data.token);
      toast.success("Logged successfully");
      setTimeout(() => {
        props.reCheck();
      }, 1000);
    }
  }, [data]);

  const onsubmit: SubmitHandler<LoginInputs> = (data) => {
    mutate(data);
  };

  return (
    <main className="flex min-h-screen w-screen items-center justify-center bg-white">
      <div className="m-1 w-11/12 rounded-3xl border border-borderColor px-6 py-5 sm:w-[450px] sm:px-12 sm:py-10">
        <div>
          <img src={logo} />
        </div>
        <h1 className="mt-8 text-lg font-semibold text-primaryText">Login</h1>

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
              className={` w-11/12 flex-1 text-primaryText placeholder-secondaryText outline-none `}
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
              className="w-11/12 flex-1 text-primaryText placeholder-secondaryText outline-none"
              type="text"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <button
            className="flex items-center justify-center gap-4 rounded-xl bg-accent py-2 text-white disabled:opacity-50"
            disabled={isLoading}
          >
            Login
            {isLoading && (
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
        <p className="mt-4 text-center text-sm text-secondaryText">
          or continue with these social profile
        </p>
        <div className="mt-4 flex w-full justify-evenly">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-borderColor hover:opacity-70 ">
            <img src={googleLogo} className="w-5 fill-red-400 text-red-300" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-borderColor hover:opacity-70  ">
            <img src={gitLogo} className="w-5 fill-red-400 text-red-300" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-borderColor hover:opacity-70  ">
            <img src={faceLogo} className="w-5 fill-red-400 text-red-300" />
          </button>
        </div>
        <div className="mx-auto mt-8 text-center text-sm text-secondaryText">
          Don’t have an account yet?{" "}
          <Link to={REGISTER} className="text-accent">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
