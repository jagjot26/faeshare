import React from "react";
import Header from "../components/Header";

function ProfilePage({ user }) {
  return (
    <div>
      <Header user={user} />
      <h1>Hey, there {user.name}</h1>
    </div>
  );
}

export default ProfilePage;
