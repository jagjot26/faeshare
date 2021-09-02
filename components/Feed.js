import React from "react";
import InputBox from "./InputBox";

function Feed({ user }) {
  return (
    <div className="flex-grow h-full pt-6 mr-5 xl:mr-40 ml-20 md:ml-0 md:mr-0  scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <InputBox user={user} />
      </div>
    </div>
  );
}

export default Feed;
