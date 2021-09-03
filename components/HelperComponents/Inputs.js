import styled from "styled-components";

export const Input = styled.input`
  font-size: 1.18rem;
  font-weight: 400;
  outline: none;

  padding: 18px;
  margin: 2.2rem 2.2rem 0 2.2rem;
  border: 1.5px solid #f0e6ff;
  color: black;
  border-radius: 10px;
  min-width: 14rem;
  max-width: 40rem;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #8f85de;
    opacity: 0.46; /* Firefox */
  }

  :focus {
    border: 2px solid #a097ea;
  }
`;

export const CustomInput = styled.input`
  font-size: 1.18rem;
  font-weight: 400;
  outline: none;
  padding: 18px;
  margin: 1.6rem 2.2rem 0 2.2rem;
  border: 1.5px solid #f0e6ff;
  color: black;
  border-radius: 10px;
  min-width: 21rem;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #8f85de;
    opacity: 0.46; /* Firefox */
  }

  :focus {
    border: 2px solid #a097ea;
  }
`;

export const Password = styled.div`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "transparent"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  padding: 18px;
  margin: 2.2rem 2.2rem 0 2.2rem;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "2.2rem")};
  min-width: ${(props) => (props.minWidth ? props.minWidth : "14rem")};
  max-width: 40rem;
  border: 1.5px solid #f0e6ff;
  :focus-within {
    border: 1.5px solid #a097ea;
  }
`;

export const PasswordInput = styled.input`
  font-size: 1.18rem;
  font-weight: 400;
  width: 100%;
  outline: none;
  border: none;
  color: black;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #8f85de;
    opacity: 0.46; /* Firefox */
  }
`;

export const SocialMedia = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  padding: 18px;
  margin: 2.2rem 0 0 0;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "2.2rem")};
  min-width: ${(props) => (props.minWidth ? props.minWidth : "14rem")};
  max-width: 40rem;
  border: 1.5px solid #f0e6ff;
  :focus-within {
    border: 1.5px solid #a097ea;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
    height: 2rem;
  }
`;

export const SocialMediaInput = styled.input`
  font-size: 1.18rem;
  font-weight: 400;
  width: 100%;
  outline: none;
  border: none;
  color: black;
  margin-left: 0.75rem;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #8f85de;
    opacity: 0.46; /* Firefox */
  }
`;
