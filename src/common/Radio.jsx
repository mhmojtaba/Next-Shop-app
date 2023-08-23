import React from "react";

function Radio({ name, id, label, value, onChange, checked }) {
  return (
    <div className="flex items-center gap-x-2 text-sky-500">
      <input
        checked={checked}
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="cursor-pointer rounded-[5px] border-none w-4 h-4 bg-cyan-400 checked:text-blue-400"
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}

export default Radio;
