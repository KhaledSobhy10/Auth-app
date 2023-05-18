import * as React from 'react';
import placeholder from "../assets/react.svg";
import logo from "../assets/icons/logo.svg";

import DropDown from "./DropDown";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IHeaderProps {
    userName: string
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    return <header className='container flex justify-between py-6 px-6 '>
        <img src={logo} />
        <div className='flex items-center gap-3'>
            <img src={placeholder} className='w-5 rounded-lg' />
            <DropDown userName={props.userName} />
        </div>
    </header>;
};






export default Header;
