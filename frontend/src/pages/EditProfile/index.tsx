import { FunctionComponent, useEffect } from "react";
import placeholder from "../../assets/react.svg";
import Header from "../../components/Header";
import cameraIcon from "../../assets/icons/photo-camera.svg";
import backIcon from "../../assets/icons/chevron-back-outline.svg";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { passwordRegex } from "../../util/common-regex";
import { toast } from "react-hot-toast";
import { useProfile } from "../../hooks/useProfile";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axios-instance";
import { getFormDataHeader } from "../../api/headers";
import axios, { isAxiosError } from "axios";
import { errorFormat } from "../../api/axios-helpers";
import { FormError } from "../../Types/errors";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IEditProfileProps {}

const EditProfile: FunctionComponent<IEditProfileProps> = (props) => {
  const schema = z.object({
    email: z.string().email("Invalid Email !"),
    password: z.string().regex(passwordRegex, "Weak Password !"),
    name: z.string().max(20).or(z.string().optional()),
    bio: z.string().max(200).or(z.string().optional()),
    photo: z.any(),
    phone: z.string().length(11).or(z.string().optional()),
  });

  type FormInputs = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  console.log("🚀 ~ file: index.tsx:36 ~ errors:", errors);

  const {
    isLoading,
    isError,
    data: responseData,
    error: getProfileError,
  } = useProfile();

  useEffect(() => {
    if (getProfileError && getProfileError instanceof Error) {
      toast.error(getProfileError.message);
    }
  }, [getProfileError]);

  useEffect(() => {
    if (responseData && responseData.success) {
      Object.keys(schema.keyof().Values).map((key) => {
        const value = responseData.data?.profile?.[key];
        if (value && value.length) {
          setValue(key as any, value);
        }
      });
    }
  }, [responseData]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await axiosInstance.put("/profile", formData, {
          headers: getFormDataHeader(),
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorFormat(error);
        } else {
          throw error;
        }
      }
    },
    onSuccess(data, variables, context) {
      toast.success("Updated successfully");
    },
  });

  useEffect(() => {
    if (mutation.error) {
      const myError = mutation.error as FormError;

      const errorMessage = myError.message || "Error !!";
      toast.error(errorMessage, {
        id: errorMessage,
      });

      if (myError.errors) {
        for (const userError of myError.errors) {
          setError(userError.key as any, { message: userError.message });
        }
      }
    }
  }, [mutation.error]);

  const navigate = useNavigate();
  const onsubmit = (data: FormInputs) => {
    console.log("🚀 ~ file: index.tsx:77 ~ onsubmit ~ data:", data);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (!value[0]) return;
      if (key === "photo") {
        formData.append(key, value[0]);
      } else formData.append(key, value);
    });
    console.log("🚀 ~ file: index.tsx:78 ~ onsubmit ~ formData:", formData);

    mutation.mutate(formData);
  };
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
    <main className="max-w-screen flex min-h-screen  flex-col items-center">
      <Header
        userName={
          responseData?.data.profile.name || responseData?.data.profile.email
        }
        avatar={responseData?.data.profile.photo_url}
      />

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
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={handleSubmit(onsubmit)}
          >
            {/* photo */}
            <label htmlFor="photo" className="flex items-center gap-8">
              <div className="relative inline-block w-fit ">
                <div className="absolute flex h-full w-full items-center justify-center rounded bg-[#00000033]">
                  <img
                    src={cameraIcon}
                    className="stoke-white w-5 bg-transparent "
                  />
                </div>
                <img
                  src={responseData.data?.profile.photo_url || placeholder}
                  className="w-16 rounded border "
                />
              </div>
              <span className="text-sm text-secondaryText">CHANGE PHOTO</span>
            </label>
            <input
              type="file"
              id="photo"
              className="sr-only	"
              {...register("photo")}
            />
            {/* name */}
            <div className="flex w-11/12 flex-col gap-1 text-sm text-secondaryText md:w-8/12 ">
              <label htmlFor="name" className="">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`  ${
                  errors?.name ? "border-pink-600 " : "border-borderColor "
                } rounded-xl border p-3  text-primaryText outline-none`}
                placeholder="Enter your name..."
                {...register("name")}
              />
              <div className="text-sm text-pink-700">
                {errors?.name?.message}
              </div>
            </div>

            {/* bio */}
            <div className="flex w-11/12 flex-col gap-1 text-sm text-secondaryText  md:w-8/12">
              <label htmlFor="bio" className="">
                Bio
              </label>
              <textarea
                {...register("bio")}
                id="bio"
                className={`  ${
                  errors?.bio ? "border-pink-600 " : "border-borderColor "
                } rounded-xl border p-3  text-primaryText outline-none`}
                placeholder="Enter your bio..."
              />
              <div className="text-sm text-pink-700">
                {errors?.bio?.message}
              </div>
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
                className={`  ${
                  errors?.phone ? "border-pink-600 " : "border-borderColor "
                } rounded-xl border p-3  text-primaryText outline-none`}
                placeholder="Enter your phone..."
              />
              <div className="text-sm text-pink-700">
                {errors?.phone?.message}
              </div>
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
                className={`  ${
                  errors?.email ? "border-pink-600 " : "border-borderColor "
                } rounded-xl border p-3  text-primaryText outline-none`}
                placeholder="Enter your email..."
              />
              <div className="text-sm text-pink-700">
                {errors?.email?.message}
              </div>
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
                className={`  ${
                  errors?.password ? "border-pink-600 " : "border-borderColor "
                } rounded-xl border p-3  text-primaryText outline-none`}
                placeholder="Enter your password..."
              />
              <div className="text-sm text-pink-700">
                {errors?.password?.message}
              </div>
            </div>
            <button
              className="px- flex w-fit items-center justify-center gap-4 rounded-lg bg-accent px-6 py-2 text-white disabled:opacity-50"
              disabled={mutation.isLoading}
            >
              Save
              {mutation.isLoading && (
                <div
                  className=" inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
