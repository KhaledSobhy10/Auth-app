import { FunctionComponent, useEffect } from "react";
import placeholder from "../../assets/react.svg";
import Header from "../../components/Header";
import { useFetch } from "../../hooks/fetch";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProfileProps { }

const Profile: FunctionComponent<IProfileProps> = (props) => {
    const { state, makeRequest } = useFetch();
    console.log("🚀 ~ file: index.tsx:10 ~ state:", state)



    useEffect(() => {
        console.log("🚀 ~ file: index.tsx:16 ~ useEffect ~ BASE_URL:", BASE_URL)
        const ROUTE = "/profile"
        makeRequest({ url: `${BASE_URL}${ROUTE}`, method: "GET" })
    }, [])

    if (state.isLoading)
        return <div className="fixed top-1/2 left-1/2 animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>

    return (
        <main className="w-screen min-h-screen flex justify-center items-center flex-col">
            <Header userName={state?.response?.data?.profile.name || state?.response?.data?.profile.email} />
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
                        <button className="border border-borderColor rounded-xl py-2 px-8  w-fit h-fit">
                            Edit
                        </button>
                    </div>
                    <h4 className="text-xs font-medium text-[#828282]">
                        Some info may be visible to other people
                    </h4>
                </div>
                <div className="grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center">
                    <span className="col-span-1 text-[#BDBDBD] text-sm">PHOTO</span>
                    <img src={state?.response?.data?.profile.photo_url} />
                </div>
                <div className="grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center">
                    <span className="col-span-1 text-[#BDBDBD] text-sm">NAME</span>
                    <p className="text-lg font-medium">{state?.response?.data?.profile.name ?? "UNKNOWN"}</p>
                </div>
                <div className="grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center">
                    <span className="col-span-1 text-[#BDBDBD] text-sm">BIO</span>
                    <p className="text-lg font-medium">
                        {state?.response?.data?.profile.bio ?? "UNKNOWN"}
                    </p>
                </div>
                <div className="grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center">
                    <span className="col-span-1 text-[#BDBDBD] text-sm">PHONE</span>
                    <p className="text-lg font-medium"> {state?.response?.data?.profile.phone ?? "UNKNOWN"}</p>
                </div>
                <div className="grid grid-cols-3 sm:py-6 sm:px-11 px-6 py-3 m-2 items-center">
                    <span className="col-span-1 text-[#BDBDBD] text-sm">EMAIL</span>
                    <p className="text-lg font-medium">{state?.response?.data?.profile.email ?? "UNKNOWN"}</p>
                </div>
            </div>
        </main>
    );
};

export default Profile;
