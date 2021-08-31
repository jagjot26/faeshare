import React from "react";
import Header from "../components/Header";

function messages({ user }) {
  return (
    <div>
      <Header user={user} />
    </div>
  );
}

export default messages;
