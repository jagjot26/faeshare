import React from "react";

function CreatePostIconDiv({ Icon, text }) {
  return (
    <div className="flex flex-grow justify-center hover:bg-gray-100 space-x-2 mb-2 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl items-center cursor-pointer">
      <Icon className="h-7" />
      <p>{text}</p>
    </div>
  );
}

export default CreatePostIconDiv;
