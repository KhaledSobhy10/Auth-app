import React, { FunctionComponent, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axios-instance";
import { getAuthHeader } from "../../api/headers";
import { errorFormat } from "../../api/axios-helpers";
import axios from "axios";
import { FormError } from "../../Types/errors";
import { toast } from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProfileProps {}

const ROUTE = "/profile";

const Profile: FunctionComponent<IProfileProps> = (props) => {
  const {
    isLoading,
    data: responseData,
    error,
  } = useQuery({
    queryKey: [ROUTE],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(ROUTE, {
          headers: getAuthHeader(),
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) errorFormat(error);
        else throw error;
      }
    },
  });

  useEffect(() => {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      // toast.error(error a);
    }
  }, [error]);

  if (isLoading)
    return (
      <div
        className="fixed left-1/2 top-1/2 inline-block h-8 w-8 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );

  return (
    <main className="flex min-h-screen w-screen  flex-col items-center">
      <Header
        userName={
          responseData?.data.profile.name || responseData?.data.profile.email
        }
        avatar={responseData?.data.profile.photo_url}
      />
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl">Personal info</h1>
        <h2 className="text-lg font-light">
          Basic info, like your name and photo
        </h2>
      </div>
      <div className="m-2  divide-y rounded-xl border sm:w-7/12">
        <div className="m-2 grid grid-cols-2 grid-rows-2 px-6 py-3 sm:px-11 sm:py-6">
          <h3 className="text-2xl font-normal">Profile</h3>
          <div className="col-span-1 row-span-2 flex items-center justify-end">
            <Link
              className=" h-fit w-fit rounded-xl border border-borderColor px-8  py-2 hover:opacity-80"
              to={"/edit-profile"}
            >
              Edit
            </Link>
          </div>
          <h4 className="text-xs font-medium text-[#828282]">
            Some info may be visible to other people
          </h4>
        </div>
        <div className="m-2 grid grid-cols-3 items-center px-6 py-3 sm:px-11 sm:py-6">
          <span className="col-span-1 text-sm text-[#BDBDBD]">PHOTO</span>
          <img
            src={responseData?.data.profile.photo_url}
            className="h-16 w-16"
          />
        </div>
        <div className="m-2 grid grid-cols-3 items-center px-6 py-3 sm:px-11 sm:py-6">
          <span className="col-span-1 text-sm text-[#BDBDBD]">NAME</span>
          <p className="text-lg font-medium">
            {responseData?.data.profile.name ?? "UNKNOWN"}
          </p>
        </div>
        <div className="m-2 grid grid-cols-3 items-center px-6 py-3 sm:px-11 sm:py-6">
          <span className="col-span-1 text-sm text-[#BDBDBD]">BIO</span>
          <p className="text-lg font-medium">
            {responseData?.data.profile.bio ?? "UNKNOWN"}
          </p>
        </div>
        <div className="m-2 grid grid-cols-3 items-center px-6 py-3 sm:px-11 sm:py-6">
          <span className="col-span-1 text-sm text-[#BDBDBD]">PHONE</span>
          <p className="text-lg font-medium">
            {" "}
            {responseData?.data.profile.phone ?? "UNKNOWN"}
          </p>
        </div>
        <div className="m-2 grid grid-cols-3 items-center px-6 py-3 sm:px-11 sm:py-6">
          <span className="col-span-1 text-sm text-[#BDBDBD]">EMAIL</span>
          <p className="text-lg font-medium">
            {responseData?.data.profile.email ?? "UNKNOWN"}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
