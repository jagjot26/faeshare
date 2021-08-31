import React from "react";
import styled from "styled-components";
import Link from "next/link";

function SidebarRow({ Icon, title, src, route }) {
  return (
    <Link href={route} passHref>
      <div className="cursor-pointer flex items-center space-x-4 p-4 hover:bg-gray-200 rounded-md">
        {src && <Image src={src} alt="profile pic" />}
        {Icon && <Icon className="h-9 w-9 text-purple-500" />}
        <p
          style={{
            fontFamily: "Roboto",
            fontWeight: "400",
            fontSize: "1.12rem",
          }}
          className="hidden sm:inline-flex text-l"
        >
          {title}
        </p>
      </div>
    </Link>
  );
}

export default SidebarRow;

const Image = styled.img`
  object-fit: cover;
  height: 2.45rem;
  width: 2.45rem;
  border-radius: 50%;
`;
