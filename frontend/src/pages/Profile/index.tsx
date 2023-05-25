import { FunctionComponent, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axios-instance";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProfileProps { }

const ROUTE = "/profile"

const Profile: FunctionComponent<IProfileProps> = (props) => {

    const { isLoading, isError, data: responseData, error } = useQuery({
        queryKey: [ROUTE],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get(ROUTE);
                return response.data
            } catch (error) {
                throw Error("err")
            }
        },
    })


    if (isLoading)
        return <div className="fixed top-1/2 left-1/2 animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>

    return (
        <main className="w-screen min-h-screen flex  items-center flex-col">
            <Header userName={responseData?.data.profile.name || responseData?.data.profile.email} />
            <div className="text-center mb-8">
                <h1 className="text-3xl mb-2">Personal info</h1>
                <h2 className="text-lg font-light">
                    Basic info, like your name and photo
                </h2>
            </div>
            <div className="sm:w-7/12  border rounded-xl divide-y m-2">
                <div className="grid grid-cols-2 grid-rows-2 sm:py-6 sm:px-11 px-6 py-3 m-2">
                    <h3 className="font-normal text-2xl">Profile</h3>
                    <div className="col-span-1 row-span-2 flex justify-end items-center">
                        <Link className=" hover:opacity-80 border border-borderColor rounded-xl py-2 px-8  w-fit h-fit" to={"/edit-profile"}>
                            Edit
                        </Link>
                    </div>
                    <h4 className="text-xs font-medium text-[#828282]">
                        Some info may be visible to other people
                    </h4>
                </div>
                <div className="grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center">
                    <span className="col-span-1 text-[#BDBDBD] text-sm">PHOTO</span>
                    <img src={responseData?.data.profile.photo_url} />
                </div>
                <div className="grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center">
                    <span className="col-span-1 text-[#BDBDBD] text-sm">NAME</span>
                    <p className="text-lg font-medium">{responseData?.data.profile.name ?? "UNKNOWN"}</p>
                </div>
                <div className="grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center">
                    <span className="col-span-1 text-[#BDBDBD] text-sm">BIO</span>
                    <p className="text-lg font-medium">
                        {responseData?.data.profile.bio ?? "UNKNOWN"}
                    </p>
                </div>
                <div className="grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center">
                    <span className="col-span-1 text-[#BDBDBD] text-sm">PHONE</span>
                    <p className="text-lg font-medium"> {responseData?.data.profile.phone ?? "UNKNOWN"}</p>
                </div>
                <div className="grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center">
                    <span className="col-span-1 text-[#BDBDBD] text-sm">EMAIL</span>
                    <p className="text-lg font-medium">{responseData?.data.profile.email ?? "UNKNOWN"}</p>
                </div>
            </div>
        </main>
    );
};

export default Profile;
