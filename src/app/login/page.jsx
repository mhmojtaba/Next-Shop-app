"use client";

import { checkOtp, getOtp, getUserProfile } from "@/services/authService";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SendOtp from "./SendOtp";
import CheckOtp from "./CheckOtp";
import { useRouter } from "next/navigation";

const ReSendOtp = 90;
function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(ReSendOtp);

  useEffect(() => {
    const timer =
      time > 0 && setInterval(() => setTime((time) => time - 1), 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);
  //

  const {
    data,
    error,
    isLoading,
    mutateAsync: mutateGetOtp,
  } = useMutation({
    mutationFn: getOtp,
  });
  const { mutateAsync: mutateCheckOtp, isLoading: isChecking } = useMutation({
    mutationFn: checkOtp,
  });
  //
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
  //
  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };
  //
  const sendOTPHandler = async (e) => {
    e.preventDefault();
    setStep(2);
    setTime(ReSendOtp);
    try {
      const { data } = await mutateGetOtp({ phoneNumber });
      setPhoneNumber("");
      // setStep(2);
      setTime(ReSendOtp);
    } catch (err) {
      // console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        duration: 3000,
      });
    }
  };
  //
  const checkOTPHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await mutateCheckOtp({ phoneNumber, otp });
      console.log(data.data.user.isActive);
      toast.success(data?.data?.message);
      if (data.data.user.isActive) {
        router.push("/");
      } else {
        router.push("/complete-profile");
      }
    } catch (err) {
      // console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        duration: 3000,
      });
    }
  };
  //
  const backHandler = () => {
    setStep(1);
    setTime(ReSendOtp);
  };

  //
  // const stepHandler = () => {
  //   switch (step) {
  //     case 1:
  //       return (
  //         <>
  //           <h2>Login Form</h2>
  //           <SendOtp
  //             onSubmit={sendOTPHandler}
  //             phoneNumber={phoneNumber}
  //             onChange={phoneNumberHandler}
  //             isLoading={isLoading}
  //           />
  //         </>
  //       );
  //       break;
  //     case 2:
  //       return (
  //         <CheckOtp
  //           isLoading={isLoading}
  //           onSubmit={checkOTPHandler}
  //           otp={otp}
  //           setOtp={setOtp}
  //           setStep={setStep}
  //           time={time}
  //           resendOtp={sendOTPHandler}
  //         />
  //       );
  //       break;
  //     default:
  //       return null;
  //       break;
  //   }
  // };

  // console.log({ data, error, isLoading });

  return (
    <div className=" flex flex-col gap-y-10 items-center justify-start mt-36">
      <div
        className={`flex flex-col gap-y-6 items-start ${
          user ? "opacity-20 blur-3xl" : " opacity-100 blur-none"
        }`}
      >
        {/* {stepHandler()} */}
        {step === 1 ? (
          <>
            <h2>Login Form</h2>
            <SendOtp
              onSubmit={sendOTPHandler}
              phoneNumber={phoneNumber}
              onChange={phoneNumberHandler}
              isLoading={isLoading}
            />
          </>
        ) : (
          <CheckOtp
            isChecking={isChecking}
            onSubmit={checkOTPHandler}
            otp={otp}
            setOtp={setOtp}
            setStep={setStep}
            time={time}
            resendOtp={sendOTPHandler}
            backHandler={backHandler}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
