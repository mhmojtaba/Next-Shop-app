"use client";

import Button from "@/common/button";
import TextField from "@/common/textField";
import http from "@/services/httpService";
import React, { useState } from "react";

function Login() {
  const [inputValue, setInputValue] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(inputValue);
    try {
      const data = await http.post("/user/get-otp", {
        phoneNumber: inputValue,
      });
      setInputValue("");
      console.log(data);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  return (
    <div className=" flex flex-col gap-y-10 items-center justify-start mt-36">
      <h2>Login Form</h2>
      <form
        onSubmit={submitHandler}
        className="border border-gray-600 px-4 py-8 rounded-lg"
      >
        <div className="flex flex-col gap-y-6 items-start">
          <div>
            <TextField
              lable="Enter Your Phone"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              id="phone"
              name="phoneNumber"
              type="phone"
            />
          </div>
          <div className="mx-auto">
            <Button type="submit" value="Enter" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
