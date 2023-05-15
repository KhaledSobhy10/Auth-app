import * as React from "react";
import emailIcon from "@/assets/icons/mail.svg"
import lockIcon from "@/assets/icons/lock-closed.svg"
import { Link } from "react-router-dom";

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  return (
    <main className="min-h-screen w-screen bg-white flex justify-center items-center">
      <div className="border rounded-3xl px-12 py-10 m-1 border-borderColor max-w-[450px]">
        <div >
          <span className="font-semibold">devchallanges</span>
        </div>
        <h1 className="font-semibold text-primaryText text-lg mt-8">Login</h1>
        
        <form className="mt-8 flex flex-col gap-4">
            <div className="border border-borderColor  rounded-xl flex p-3 gap-3">
                <img src={emailIcon} className="w-5 "/>
            <input className="outline-none flex-1 text-primaryText placeholder-secondaryText" type="email" placeholder="Email"/>
            </div>
            <div className="border border-borderColor  rounded-xl flex p-3 gap-3">
                <img src={lockIcon} className="w-5 "/>
            <input  className="outline-none flex-1 text-primaryText placeholder-secondaryText" type="password" placeholder="Password"/>
            </div>
            <button className="bg-accent rounded-xl text-white py-2">Login</button>
            
        </form>
        <div className="mt-8 mx-auto text-sm text-center text-secondaryText">Don’t have an account yet? <Link to={"/register"} className="text-accent">Register</Link></div>
      </div>
    </main>
  );
};

export default Login;
