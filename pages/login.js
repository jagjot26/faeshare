import React, { useState, useEffect, useRef } from "react";
import cookie from "js-cookie";
import { loginUser } from "../utils/authUser";
import styled from "styled-components";
import Link from 'next/link'

function login() {
    return (
        <>
        <Container>
        <Heading>FaeShare</Heading>
        <Subheading>
            A place where everyone gets their fair share of attention.
        </Subheading>
        <LoginBox >
   
        <Input placeholder="Enter Email" />
        <Input placeholder="Enter Password" />
        <Button>Log In</Button>
        <SmallButton>Forgotten Password?</SmallButton>
        <span style={{height: '1.5px',  backgroundColor: '#f0e6ff', margin: '0.4rem 2.2rem 0 2.2rem'}}></span>

        <BottomText>New to FaShare? <Link href="/signup">
  <BottomAnchor>Create an account.</BottomAnchor>
</Link>
 </BottomText> 
        </LoginBox>
 
        </Container>
        </>
    )
}

export default login


const Container = styled.div`
padding-top: 4rem;
 display: flex;
 flex-direction: column;
 align-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const Heading = styled.h1`
  color: #6050dc;
  font-size: 3.39rem;
  font-weight: 900;
  font-family: 'Poppins', sans-serif;

`;

const Subheading = styled.p `
text-align: center;
color: #b19cd9;
font-family: 'Roboto', sans-serif;
font-size: 1.25rem;
max-width: 32rem;
`

const LoginBox  = styled.div `
display: flex;
flex-direction: column;
margin-top: 2.3rem;
  background: white;
 border-radius: 20px;
 box-shadow: 
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12);
 
  height: 59vh;
  width: 36vw;
  min-width: 24rem;
`

const Input = styled.input`

font-size: 1.18rem;
  font-weight: 400;
  outline: none;
  border: none;
  padding: 18px;
  margin: 2.2rem 2.2rem 0 2.2rem ;
  border: 1.5px solid #f0e6ff;
  color: black;
  border-radius: 10px;
  min-width: 14rem;
  max-width: 40rem;
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #8f85de;
  opacity: 0.46; /* Firefox */
  
}

:focus{
    border: 2px solid #a097ea
}
`;

const Button = styled.button `
transition: all 0.4s;
cursor: pointer;
 border-radius: 10px;
 background-color: ${props => props.backgroundColor ? props.backgroundColor : "#6050dc"};
 color: white;
font-size: 1.5rem;
font-family: 'Poppins', sans-serif;
margin: 2.2rem 2.2rem 1.5rem 2.2rem;
padding: 18px;
font-weight: 500;
border: none;

:hover{
 background-color: #3e2fb3;
}
`

const ButtonExtra = styled.button `
transition: all 0.4s;
cursor: pointer;
 border-radius: 10px;
 background-color: ${props => props.backgroundColor ? props.backgroundColor : "#6050dc"};
 color: white;
font-size: 1.5rem;
font-family: 'Poppins', sans-serif;
margin: 0 2.2rem 0 2.2rem;
padding: 18px;
font-weight: 500;
border: none;

:hover{
 background-color: #3e2fb3;
}
`



const SmallButton = styled.p `
cursor: pointer;
text-align: center;
color: #b19cd9;
font-family: 'Roboto', sans-serif;
font-size: 1.25rem;
:hover{
    text-decoration: underline;
}
`

const BottomText = styled.p `
color: #b19cd9;
font-size: 1.1rem;
text-align: center;
font-family: 'Roboto', sans-serif;
margin-top: 2rem;
font-weight: 300;
`

const BottomAnchor = styled.a `
color: #ff8af2;
:hover{
    cursor: pointer;
    color: #ff8af2;
    text-decoration: underline;
}
`

