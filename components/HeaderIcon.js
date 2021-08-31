import React from "react";

function HeaderIcon({ Icon, active }) {
  return (
    <div
      className={`flex items-center cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 rounded-xl  ${
        active ? "border-purple-500" : ""
      } group`}
    >
      <Icon
        className={`h-7 text-gray-500 text-center sm:h-7 mx-auto group-hover:text-purple-500 ${
          active ? "text-purple-500" : ""
        } `}
      />
    </div>
  );
}

export default HeaderIcon;
