import downIcon from "../assets/icons/caret-down-outline.svg"
import personIcon from "../assets/icons/person-circle.svg"
import groupIcon from "../assets/icons/people-circle.svg"
import logoutIcon from "../assets/icons/log-out-outline.svg";
import { Menu } from '@headlessui/react';

interface IDropDownProps {
    userName: string
}


const DropDown: React.FunctionComponent<IDropDownProps> = (props) => {
    return <Menu>
        {({ open }) =>
            <div className='relative'>
                <Menu.Button className="flex items-center gap-2 text-sm">{props.userName}<img src={downIcon} className={`w-3 h-3  ${open && "rotate-180"} transition-transform`} /></Menu.Button>
                <Menu.Items className={`flex flex-col gap-2  p-3 bg-white border rounded-xl w-48 overflow-hidden absolute right-0 top-[200%] shadow`}>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-[#F2F2F2]'} rounded-lg px-3 py-2 flex gap-2 text-[#4F4F4F]`}
                                href="#"
                            >
                                <img src={personIcon} className="w-6" />
                                My Profile
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-[#F2F2F2]'} rounded-lg px-3 py-2 flex gap-2 text-[#4F4F4F]`}
                                href="#"
                            >
                                <img src={groupIcon} className="w-6" />
                                Group Chat
                            </a>
                        )}
                    </Menu.Item>
                    <div className="border-t"></div>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-[#F2F2F2]'} rounded-lg px-3 py-2 flex gap-2 text-[#EB5757]`}
                                href="#"
                            >
                                <img src={logoutIcon} className="w-6" />
                                Logout
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>

            </div>
        }
    </Menu>

};


export default DropDown;