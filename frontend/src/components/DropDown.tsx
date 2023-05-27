import downIcon from "../assets/icons/caret-down-outline.svg";
import personIcon from "../assets/icons/person-circle.svg";
import groupIcon from "../assets/icons/people-circle.svg";
import logoutIcon from "../assets/icons/log-out-outline.svg";
import { Menu } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { USER_TOKEN } from "../constants/keys";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

interface IDropDownProps {
  userName: string;
}

const DropDown: React.FunctionComponent<IDropDownProps> = (props) => {
  const { reCheck } = useContext(AuthContext);

  const loggingOut = () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem(USER_TOKEN);
        reCheck();
        resolve("Logged out");
      }, 800);
    });

    toast.promise(promise, {
      loading: "Logging out ...",
      success: "Logged out",
      error: "Error when Logging out",
    });
  };
  return (
    <Menu>
      {({ open }) => (
        <div className="relative  ">
          <Menu.Button className="flex items-center gap-2 text-sm hover:opacity-80">
            {props.userName}
            <img
              src={downIcon}
              className={`h-3 w-3  ${
                open && "rotate-180"
              } transition-transform`}
            />
          </Menu.Button>
          <Menu.Items
            className={`absolute right-0 top-[200%]  flex w-48 flex-col gap-2 overflow-hidden rounded-xl border bg-white p-3 shadow`}
          >
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active && "bg-[#F2F2F2]"
                  } flex gap-2 rounded-lg px-3 py-2 text-[#4F4F4F]`}
                  to={"/"}
                >
                  <img src={personIcon} className="w-6" />
                  My Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active && "bg-[#F2F2F2]"
                  } flex gap-2 rounded-lg px-3 py-2 text-[#4F4F4F]`}
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
                <button
                  className={`${
                    active && "bg-[#F2F2F2]"
                  } flex gap-2 rounded-lg px-3 py-2 text-[#EB5757]`}
                  onClick={loggingOut}
                >
                  <img src={logoutIcon} className="w-6" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </div>
      )}
    </Menu>
  );
};

export default DropDown;
