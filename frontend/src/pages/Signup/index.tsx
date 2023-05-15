import * as React from "react";
import emailIcon from "@/assets/icons/mail.svg";
import lockIcon from "@/assets/icons/lock-closed.svg";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

interface ISignUpProps {}

const schema = z.object({
  email: z.string().email("Invalid Email !"),
  password: z.string().regex(new RegExp("^(?=.*[A-Z])(?=.*\d).{8,}$")),
});

type FormData = z.infer<typeof schema>;

const SignUp: React.FunctionComponent<ISignUpProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onsubmit: SubmitHandler<FormData> = (data) => {
    console.log("data", data);
  };
  return (
    <main className="min-h-screen w-screen bg-white flex justify-center items-center">
      <div className="border rounded-3xl px-12 py-10 m-1 border-borderColor max-w-[450px]">
        <div>
          <span className="font-semibold">devchallanges</span>
        </div>
        <h1 className="font-semibold text-primaryText text-lg mt-8">
          Join thousands of learners from around the world{" "}
        </h1>
        <h2 className="mt-3 font text-primaryText">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </h2>
        <form
          className="mt-8 flex flex-col gap-7"
          onSubmit={handleSubmit(onsubmit)}
          noValidate
        >          
          <div className={` border ${errors?.email ? "border-pink-600 ":"border-borderColor "} rounded-xl flex p-3 gap-3 relative `}>
          <div className="text-pink-700 text-sm absolute top-full right-0">{errors?.email?.message}</div>
            <img src={emailIcon} className="w-5 " />
            <input
              className={` outline-none flex-1 text-primaryText placeholder-secondaryText `}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
          </div>


          <div className={` border ${errors?.password ? "border-pink-600 ":"border-borderColor "} rounded-xl flex p-3 gap-3 relative `}>
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
        <div className="mt-8 mx-auto text-sm text-center text-secondaryText">
          Adready a member?
          <Link to={"/login"} className="text-accent">
            {" "}
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
