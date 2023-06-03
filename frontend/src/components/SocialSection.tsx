import * as React from "react";
import googleLogo from "../assets/icons/logo-google.svg";
import gitLogo from "../assets/icons/logo-github.svg";
import faceLogo from "../assets/icons/logo-facebook.svg";

interface ISocialSectionProps {}

const SocialSection: React.FunctionComponent<ISocialSectionProps> = (props) => {
  return (
    <div className="mt-4 flex w-full justify-evenly">
      <a
        href="https://accounts.google.com/o/oauth2/v2/auth?client_id=678180525218-lslk3bqg89mr97kntfhd7lbjs4od3g8h.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&access_type=offline&prompt=consent"
        target="_self"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-borderColor hover:opacity-70 "
      >
        <img src={googleLogo} className="w-5 fill-red-400 text-red-300" />
      </a>
      <a
        target="_self"
        href="https://github.com/login/oauth/authorize?client_id=96cb4dd0c13f2a70b991&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fapi%2Fauth%2Fgithub%2Fcallback&scope=user%3Aemail"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-borderColor hover:opacity-70  "
      >
        <img src={gitLogo} className="w-5 fill-red-400 text-red-300" />
      </a>
      <button className="flex h-10 w-10 items-center justify-center rounded-full border border-borderColor hover:opacity-70  ">
        <img src={faceLogo} className="w-5 fill-red-400 text-red-300" />
      </button>
    </div>
  );
};

export default SocialSection;
