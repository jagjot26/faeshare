import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Heading, Subheading } from "../components/Headings";
import { Input, Password, PasswordInput } from "../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import ImageDiv from "./ImageDiv";

function AddProfilePic() {
  const inputRef = useRef();
  const user = useSelector(selectUser);
  console.log(user);

  const [media, setMedia] = useState(null);

  const handleImage = (e) => {
    const { name, value, files } = e.target;
    if (name === "media") {
      setMedia(files[0]); //files that we receive from e.target is automatically an array, so we don't need Array.from
      setMediaPreview(URL.createObjectURL(files[0]));
    }
  };

  const submitProfile = async () => {
    let profilePicUrl;
    if (media !== null) {
      profilePicUrl = await uploadPic(media);
    }

    //in case of error
    if (media !== null && !profilePicUrl) {
      return setErrorMessage("Error Uploading Image");
    } else {
      console.log(profilePicUrl);
    }
  };

  return (
    <>
      <Container>
        <ImageDiv
          mediaPreview={mediaPreview}
          setMediaPreview={setMediaPreview}
          setMedia={setMedia}
          inputRef={inputRef}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          handleImage={handleImage}
        ></ImageDiv>
        <h1>ProfilePic Fae</h1>
        <Heading>FaeShare</Heading>
        <Subheading>
          A place where everyone gets their fair share of attention.
        </Subheading>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  background-color: whitesmoke;
`;

export default AddProfilePic;
