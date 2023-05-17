import { useEffect } from "react";
import emailIcon from "@/assets/icons/mail.svg";
import lockIcon from "@/assets/icons/lock-closed.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useFetch } from "../../hooks/fetch";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAuthProps {
  isSignUp: boolean
  reCheck: () => void
}

const regexPassword = new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/g)

const schema = z.object({
  email: z.string().email("Invalid Email !"),
  password: z.string().regex(regexPassword, "Weak Password !"),
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

  const { state, makeRequest } = useFetch();
  const navigate = useNavigate();

  // console.log(state);

  const registerProfile = (data: FormData) => {
    const BASE_URL = "http://localhost:3000/api";
    const ROUTE = props.isSignUp ? "/profile" : "/auth/login"
    makeRequest({ data, url: `${BASE_URL}${ROUTE}`, method: "POST" })
  }

  const onsubmit: SubmitHandler<FormData> = (data) => {
    registerProfile(data)
  };


  useEffect(() => {
    if (state?.response) {
      const { success, errors, data } = state.response;
      if (success) {
        localStorage.setItem("user_token", data.token);
        props.reCheck();
        return;
      }

      if (errors) {
        type name = "email" | "password";
        const errorsKeysValue = errors as { key: name, message: string }[]
        errorsKeysValue.forEach(({ key, message }) => {
          setError(key, { type: 'custom', message: message });
        })
      }
    }
  }, [state?.response])

  return (
    <main className="min-h-screen w-screen bg-white flex justify-center items-center">
      {state?.response?.message && <div className="absolute z-50 top-2 max-w-xs bg-white border rounded-md shadow-lg" role="alert">
        <div className="flex p-4">
          <div className="flex-shrink-0">
            <svg className="h-4 w-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700 ">
              {state?.response?.message}
            </p>
          </div>
        </div>
      </div>}

      <div className="border rounded-3xl sm:px-12 sm:py-10 px-6 py-5 m-1 border-borderColor sm:w-[450px] w-11/12">
        <div>
          <span className="font-semibold">devchallanges</span>
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
          <button className="bg-accent rounded-xl text-white py-2">
            Start coding now
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


