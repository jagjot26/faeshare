import { XIcon } from "@heroicons/react/solid";
import React from "react";

function InfoBox({ Icon, message, content, setError, marginTop }) {
  return (
    <div
      style={{
        position: "relative",
      }}
      className={` bg-white w-full ${
        marginTop ? "mt-0" : "mt-7"
      }  p-3 rounded-xl shadow-md`}
    >
      <div
        className={`flex space-x-1 ml-1.5 items-center ${
          setError ? "text-red-600" : ""
        } `}
      >
        <Icon className="h-5" />
        <p className="font-semibold text-lg">{message}</p>
      </div>
      <p className={`text-sm ml-3 ${setError ? "text-red-400" : ""}`}>
        {content}
      </p>
      {setError && (
        <XIcon
          className="h-4 sm:h-6 "
          style={{
            right: ".6rem",
            top: ".6rem",
            position: "absolute",

            cursor: "pointer",
          }}
          onClick={() => {
            setError(null);
          }}
        />
      )}
    </div>
  );
}

export default InfoBox;
