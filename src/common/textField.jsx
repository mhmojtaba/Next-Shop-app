import React from "react";

function TextField({ lable, value, onChange, id, name, type }) {
  return (
    <div className="flex gap-x-5 gap-y-5 md:gap-y-0 flex-col md:flex-row">
      <label htmlFor={id}>{lable}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        id={id}
        className="border border-gray-400 outline-none px-3 py-1 rounded-lg focus:bg-white bg-gray-100"
      />
    </div>
  );
}

export default TextField;
