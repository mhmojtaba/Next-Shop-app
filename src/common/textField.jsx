import React from "react";

function TextField({ label, value, onChange, id, name, type }) {
  return (
    <div className=" px-4 py-4 rounded-lg ">
      <div className="flex justify-between gap-x-5 gap-y-5 md:gap-y-0 flex-col md:flex-row ">
        <label htmlFor={id} className="flex-1">
          {label}
        </label>
        <input
          required={true}
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          id={id}
          className="border-0 md:w-2/3 w-full outline-none px-3 py-1 rounded-lg focus:bg-gray-100 bg-gray-300"
        />
      </div>
    </div>
  );
}

export default TextField;
