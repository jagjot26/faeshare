import React from "react";

function RoundedIcon({ Icon, active, padding }) {
  return (
    <div
      className={`hidden lg:flex bg-gray-200 ${
        padding ? padding : "px-4"
      } items-center cursor-pointer sm:h-14 md:hover:bg-gray-300 rounded-full  ${
        active ? "border-purple-500" : ""
      } group`}
    >
      <Icon
        style={{ fontSize: "2.8rem" }}
        className={`w-6 text-gray-500 text-center sm:h-7 mx-auto group-hover:text-purple-500 ${
          active ? "text-purple-500" : ""
        } `}
      />
    </div>
  );
}

export default RoundedIcon;
