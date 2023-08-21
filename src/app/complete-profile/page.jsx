"use client";

import { completeProfile, getUserProfile } from "@/services/authService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CircleLoader } from "react-spinners";

function Profile() {
  const router = useRouter();
  const {
    data,
    error,
    isLoading,
    mutateAsync: mutateCompleteProfile,
  } = useMutation({
    mutationFn: completeProfile,
  });
  const { data: userData } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    refetchOnWindowFocus: true,
    retry: false,
  });
  //
  const user = userData?.data?.data?.user || {};
  useEffect(() => {
    if (userData && user) router.push("/profile");
  }, [user]);
  // console.log();

  //
  const onSubmit = async (e) => {
    // console.log(e);
    try {
      const { data } = await mutateCompleteProfile({
        name: e.name,
        email: e.email,
      });
      const message = data?.data?.message;
      console.log(message);
      toast.success(message, {
        duration: 3000,
      });
      router.push("/");
    } catch (err) {
      // console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        duration: 3000,
      });
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className=" flex flex-col gap-y-10 items-center justify-start mt-36 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={` flex flex-col gap-y-4 ${
          user ? "opacity-20 blur-3xl" : " opacity-100 blur-none"
        }`}
      >
        <label>Name</label>
        <input
          className="px-3 py-1 rounded-md border border-gray-400"
          {...register("name", { required: true })}
        />
        {errors.Name && <p>name is required.</p>}
        <label>Email</label>
        <input
          className="px-3 py-1 rounded-md border border-gray-400"
          {...register(
            "email",
            { required: true },
            {
              pattern:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            }
          )}
        />
        {errors.Email && <p>Email is required.</p>}

        <button
          type="submit"
          className="bg-sky-400 text-white hover:text-sky-600 hover:bg-sky-200 rounded-lg outline-none px-4 py-2 flex justify-center items-center"
        >
          {isLoading ? (
            <CircleLoader
              color="#ffffff"
              loading="true"
              size={18}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Enter"
          )}
        </button>
      </form>
    </div>
  );
}

export default Profile;
