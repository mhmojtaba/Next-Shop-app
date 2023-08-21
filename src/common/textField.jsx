import React from "react";

function TextField({ label, value, onChange, id, name, type }) {
  return (
    <div className="border border-gray-600 px-4 py-8 rounded-lg">
      <div className="flex gap-x-5 gap-y-5 md:gap-y-0 flex-col md:flex-row">
        <label htmlFor={id}>{label}</label>
        <input
          required={true}
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          id={id}
          className="border border-gray-400 outline-none px-3 py-1 rounded-lg focus:bg-white bg-gray-100"
        />
      </div>
    </div>
  );
}

export default TextField;
