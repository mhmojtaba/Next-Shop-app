"use client";
import React from "react";
import { CircleLoader } from "react-spinners";

function Button({ value, onClick, type, isLoading }) {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
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
          value
        )}
      </button>
    </div>
  );
}

export default Button;
