import React from "react";
import styled from "styled-components";

function RoundedIcon({ Icon, active, padding, stayVisible }) {
  return (
    <div
      style={{ borderRadius: "50%" }}
      className={`${stayVisible ? "flex" : "hidden lg:flex"} bg-gray-200 ${
        padding ? padding : "px-3"
      } items-center cursor-pointer sm:h-12 md:hover:bg-gray-300  ${
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

// const Container = styled.div`
// display: hidden;
// cursor: pointer;
// background-color: #E5E7EB;
// @media (min-width: 768px) {
//     display: flex;
//     align-items: center;
// }
// padding: ${props.padding? props.padding: '2rem'};

// `;

export default RoundedIcon;
