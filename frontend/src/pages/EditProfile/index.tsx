import { FunctionComponent, useEffect } from "react";
import placeholder from "../../assets/react.svg";
import Header from "../../components/Header";
import { useFetch } from "../../hooks/fetch";
import cameraIcon from "../../assets/icons/photo-camera.svg";
import backIcon from "../../assets/icons/chevron-back-outline.svg";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { passwordRegex } from "../../util/common-regex";
import axiosInstance from "../../api/axios-instance";
import { useQuery } from "@tanstack/react-query";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IEditProfileProps {}

const EditProfile: FunctionComponent<IEditProfileProps> = (props) => {



  const { isLoading, isError, data: responseData, error } = useQuery({
    queryKey: ["/profile"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/profile");
        return response.data
      } catch (error) {
        throw Error("err")
      }
    },
  })



  const schema = z.object({
    email: z.string().email("Invalid Email !"),
    password: z.string().regex(passwordRegex, "Weak Password !"),
    name: z.string().max(20),
    bio: z.string().max(200),
    phone: z.string().length(11).or(z.string().optional()),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { state, makeRequest } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🚀 ~ file: index.tsx:16 ~ useEffect ~ BASE_URL:", BASE_URL);
    const ROUTE = "/profile";
    makeRequest(url: `${BASE_URL}${ROUTE}`, method: "GET" });
  }, []);

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

const onsubmit = (data: FormData) => {
  console.log("🚀 ~ file: index.tsx:59 ~ onsubmit ~ data:", data)
}

  return (
    <main className="max-w-screen flex min-h-screen  flex-col items-center">
      <Header userName={responseData?.data.profile.name || responseData?.data.profile.email} />


      <div className="m-2 w-11/12 text-start sm:w-7/12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-accent hover:opacity-80"
        >
          <img src={backIcon} className="h-5" />
          Back
        </button>
      </div>

      <div className="my-4  rounded-xl border sm:w-7/12">
        <div className="m-2 px-6 py-3 sm:px-11 sm:py-6">
          <h3 className="text-2xl font-normal">Change Info</h3>
          <h4 className="text-xs font-medium text-[#828282]">
            Changes will be reflected to every services
          </h4>
        </div>
        <div className="m-2 w-full items-center px-6 py-3 sm:px-11 sm:py-6">
          <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit(onsubmit)}> 
            {/* photo */}
            <label htmlFor="photo" className="flex items-center gap-8">
              <div className="relative inline-block w-fit ">
                <div
                  className="absolute flex h-full w-full items-center justify-center rounded bg-[#00000033]">
                  <img
                    src={cameraIcon}
                    className="stoke-white w-5 bg-transparent "
                  />
                </div>
                <img
                  src={state?.response?.data?.profile.photo_url || placeholder}
                  className="w-16 rounded border "
                />
              </div>
              <span className="text-sm text-secondaryText">CHANGE PHOTO</span>
            </label>
            <input type="file" name="photo" id="photo" className="sr-only	" />
            {/* name */}
            <div className="flex w-11/12 flex-col gap-1 text-sm text-secondaryText md:w-8/12 ">
              <label htmlFor="name" className="">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`  ${errors?.name ? "border-pink-600 " : "border-borderColor "} rounded-xl border p-3  text-primaryText outline-none`}
                placeholder="Enter your name..."
                {...register("name")}
              />
            </div>
            {/* bio */}
            <div className="flex w-11/12 flex-col gap-1 text-sm text-secondaryText  md:w-8/12">
              <label htmlFor="bio" className="">
                Bio
              </label>
              <textarea
                {...register("bio")}
                id="bio"
                className={`  ${errors?.bio ? "border-pink-600 " : "border-borderColor "} rounded-xl border p-3  text-primaryText outline-none`}
                placeholder="Enter your bio..."
              />
            </div>
            {/* phone */}
            <div className="flex w-11/12 flex-col gap-1 text-sm text-secondaryText  md:w-8/12">
              <label htmlFor="phone" className="">
                Phone
              </label>
              <input
                type="text"
                {...register("phone")}
                id="phone"
                className={`  ${errors?.phone ? "border-pink-600 " : "border-borderColor "} rounded-xl border p-3  text-primaryText outline-none`}
                placeholder="Enter your phone..."
              />
            </div>
            {/* email */}
            <div className="flex w-11/12 flex-col gap-1 text-sm text-secondaryText  md:w-8/12">
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                id="email"
                className={`  ${errors?.email ? "border-pink-600 " : "border-borderColor "} rounded-xl border p-3  text-primaryText outline-none`}
                placeholder="Enter your email..."
              />
            </div>
            {/* password */}
            <div className="flex w-11/12 flex-col gap-1 text-sm text-secondaryText  md:w-8/12">
              <label htmlFor="password" className="">
                Password
              </label>
              <input
                type="text"
                {...register("password")}
                id="password"
                className={`  ${errors?.password ? "border-pink-600 " : "border-borderColor "} rounded-xl border p-3  text-primaryText outline-none`}
                placeholder="Enter your password..."
              />
            </div>
            <button className="flex justify-center items-center gap-4 px- w-fit rounded-lg bg-accent px-6 py-2 text-white">
              Save
              {isLoading &&
                <div className=" animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
                </div>}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
