"use client";
import { toLocalDateString } from "@/app/utils/tolocalDate";
import { useGetUser } from "@/hooks/useAuth";
import React from "react";
import { Blocks } from "react-loader-spinner";

export default function Profile() {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  // console.log(user);
  if (isLoading)
    return (
      <div className=" flex flex-col gap-y-10 items-center justify-start mt-20">
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
    );
  return (
    <div className=" flex flex-col gap-y-10 items-center justify-start mt-6">
      Profile page
      <h1>
        welcome <span className="text-red-500">{user?.name}</span>
      </h1>
      <h3>
        user Email : <span className="text-red-500">{user?.email}</span>
      </h3>
      <p>
        User CreatedAt:
        <span className="text-red-500" dir="rtl">
          {toLocalDateString(user?.createdAt)}
        </span>
      </p>
    </div>
  );
}
