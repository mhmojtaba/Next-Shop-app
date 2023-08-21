"use client";
import Button from "@/common/button";
import React from "react";
import OtpInput from "react-otp-input";

function CheckOtp({
  onSubmit,
  isChecking,
  otp,
  setOtp,
  setStep,
  time,
  resendOtp,
  backHandler,
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={backHandler}
          className="bg-sky-400 text-white hover:text-sky-600 hover:bg-sky-200 rounded-lg outline-none px-4 py-2 flex justify-center items-center"
        >
          Back
        </button>
        <div>
          {time > 0 ? (
            <p>
              <span className="text-red-500">{time}</span> to resend
            </p>
          ) : (
            <button
              className="bg-red-400 text-white hover:text-red-600 hover:bg-red-200 rounded-lg outline-none px-4 py-2 flex justify-center items-center"
              onClick={resendOtp}
            >
              resend otp?
            </button>
          )}
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <p className="mb-5">Enter OTP code:</p>
        <OtpInput
          inputStyle={{
            width: "2.5rem",
            height: "40px",
            borderRadius: "6px",
            margin: "0 3px",
            border: "1px solid gray",
          }}
          value={otp}
          containerStyle="flex gap-x-2 justify-center"
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
        <div className="mt-5">
          <Button type="submit" value="Enter" isLoading={isChecking} />
        </div>
      </form>
    </div>
  );
}

export default CheckOtp;
