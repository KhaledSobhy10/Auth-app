import * as React from "react";
import placeholder from "../assets/react.svg";
import logo from "../assets/icons/logo.svg";

import DropDown from "./DropDown";
interface IHeaderProps {
  userName: string;
  avatar?: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header className="container flex justify-between px-6 py-6 ">
      <img src={logo} />
      <div className="flex items-center gap-3">
        <img src={props.avatar || placeholder} className="w-5 rounded-lg" />
        <DropDown userName={props.userName} />
      </div>
    </header>
  );
};

export default Header;
