import Button from "@/common/button";
import TextField from "@/common/textField";
import React from "react";

function SendOtp({ phoneNumber, onChange, isLoading, onSubmit }) {
  return (
    <>
      <form onSubmit={onSubmit} className=" px-4 py-8 ">
        <div>
          <TextField
            label="Enter Your Phone"
            value={phoneNumber}
            onChange={onChange}
            id="phone"
            name="phoneNumber"
            type="phone"
          />
        </div>
        <div className="mx-auto mt-5">
          <Button type="submit" value="Enter" isLoading={isLoading} />
        </div>
      </form>
    </>
  );
}

export default SendOtp;
