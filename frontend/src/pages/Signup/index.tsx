import * as React from "react";
import emailIcon from "@/assets/icons/mail.svg"
interface ISignUpProps {}

const SignUp: React.FunctionComponent<ISignUpProps> = (props) => {
  return (
    <main className="min-h-screen w-screen bg-white flex justify-center items-center">
      <div className="border rounded-2xl px-12 py-10 m-1 border-borderColor max-w-[450px]">
        <div >
          <span className="font-semibold">devchallanges</span>
        </div>
        <h1 className="font-semibold text-primaryText text-lg mt-8">Join thousands of learners from around the world </h1>
        <h2 className="mt-3 font text-primaryText">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </h2>
        <form className="mt-8">
            <div>
                <img src={emailIcon}/>
            <input type="email" placeholder="email"/>
            </div>
            
        </form>
      </div>
    </main>
  );
};

export default SignUp;
