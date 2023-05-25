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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAuthProps {
  isSignUp: boolean
  reCheck: () => void
}


const schema = z.object({
  email: z.string().email("Invalid Email !"),
  password: z.string().regex(passwordRegex, "Weak Password !"),
});

type FormData = z.infer<typeof schema>;

const Auth: React.FunctionComponent<IAuthProps> = (props: IAuthProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const URL = props.isSignUp ? "/profile" : "/auth/login"
  const notifyError = (message: string) => toast.error(message, { id: "error-toast" });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return axiosInstance.post(URL,
        data
      );
    }
    , onError(error, variables, context) {

      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors) {
          const errors = error.response?.data.errors as { key: "email" | "password", message: string }[];
          errors.forEach(error => {
            setError(error.key, { type: 'custom', message: error.message });
          });
        } else
          notifyError(error.response?.data.message || "Error");
      }
      else
        notifyError("Error !!");

    },
    onSuccess(response, variables, context) {
      if (response.data && response.data.success) {
        if (response.data.data.token) {
          localStorage.setItem(USER_TOKEN, response.data.data.token)
          props.reCheck()
        }
      }
    },
  });

  const registerProfile = (data: FormData) => {
    mutation.mutate(data);
  }

  const onsubmit: SubmitHandler<FormData> = (data) => {
    registerProfile(data)
  };


  return (
    <main className="min-h-screen w-screen bg-white flex justify-center items-center">
      <div className="border rounded-3xl sm:px-12 sm:py-10 px-6 py-5 m-1 border-borderColor sm:w-[450px] w-11/12">
        <div>
          <img src={logo} />
        </div>
        <h1 className="font-semibold text-primaryText text-lg mt-8">
          {props.isSignUp ? "Join thousands of learners from around the world" : "Login"}
        </h1>
        {props.isSignUp && <h2 className="mt-3 font text-primaryText">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </h2>}

        <form
          className="mt-8 flex flex-col gap-7"
          onSubmit={handleSubmit(onsubmit)}
          noValidate
        >
          <div className={` border ${errors?.email ? "border-pink-600 " : "border-borderColor "} rounded-xl flex p-3 gap-3 relative `}>
            <div className="text-pink-700 text-sm absolute top-full right-0">{errors?.email?.message}</div>
            <img src={emailIcon} className="w-5 " />
            <input
              className={` outline-none flex-1 text-primaryText placeholder-secondaryText `}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
          </div>


          <div className={` border ${errors?.password ? "border-pink-600 " : "border-borderColor "} rounded-xl flex p-3 gap-3 relative `}>
            <div className="text-pink-700 text-sm absolute top-full right-0">{errors?.password?.message}</div>

            <img src={lockIcon} className="w-5 " />
            <input
              className="outline-none flex-1 text-primaryText placeholder-secondaryText"
              type="text"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <button className="flex items-center justify-center gap-4 bg-accent rounded-xl text-white py-2 disabled:opacity-50" disabled={mutation.isLoading}>
            {props.isSignUp ? "Start coding now" : "Login"}
            {mutation.isLoading &&
              <div className=" animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>}
          </button>
        </form>
        {props.isSignUp ? <div className="mt-8 mx-auto text-sm text-center text-secondaryText">
          Adready a member?
          <Link to={"/login"} className="text-accent">
            Login
          </Link>
        </div> : <div className="mt-8 mx-auto text-sm text-center text-secondaryText">Don’t have an account yet? <Link to={"/register"} className="text-accent">Register</Link></div>
        }


      </div>
    </main>
  );
};

export default Auth;


