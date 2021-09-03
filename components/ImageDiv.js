import styles from "../styles/styles.module.css";
import React from "react";
import styled from "styled-components";
import uploadPic from "../utils/uploadPic";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateIcon from "@material-ui/icons/Create";

function ImageDiv({
  mediaPreview,
  setMediaPreview,
  setMedia,
  inputRef,
  handleChange,
  profilePicUrl,
}) {
  return (
    <>
      <ImageInput
        type="file"
        accept="image/*"
        onChange={handleChange}
        name="media"
        ref={inputRef}
      ></ImageInput>
      {mediaPreview === null ||
      profilePicUrl === null ||
      profilePicUrl === "" ? (
        <>
          <ImageContainer
            style={{ position: "relative" }}
            onClick={() => inputRef.current.click()}
          >
            <AddCircleIcon
              style={{
                cursor: "pointer",
                position: "absolute",
                bottom: "-.4rem",
                right: "1.7rem",
                color: "#cd7fd9",
                fontSize: "2.3rem",
              }}
            />
          </ImageContainer>{" "}
        </>
      ) : (
        <>
          <ImageContainer
            style={{ position: "relative" }}
            onClick={() => inputRef.current.click()}
          >
            <Image src={mediaPreview} alt="image preview" />
            <AddCircleIcon
              style={{
                cursor: "pointer",
                position: "absolute",
                bottom: "-.4rem",
                right: "1.7rem",
                color: "#cd7fd9",
                fontSize: "2.3rem",
              }}
            />
          </ImageContainer>
        </>
      )}
    </>
  );
}

export default ImageDiv;

const ImageContainer = styled.div`
  height: 8.5rem;
  width: 8.5rem;
  border-radius: 50%;
  background: rgb(113, 47, 173);
  background: linear-gradient(
    90deg,
    rgba(113, 47, 173, 1) 0%,
    rgba(233, 78, 164, 1) 0%,
    rgba(63, 51, 251, 1) 100%,
    rgba(63, 51, 251, 1) 100%,
    rgba(63, 51, 251, 1) 100%
  );
`;

const ImageInput = styled.input`
  display: none;
`;

const Image = styled.img`
  object-fit: cover;
  height: 8.5rem;
  width: 8.5rem;
  border-radius: 50%;
`;

{
  /* <>
<Form.Field>
  <Segment placeholder basic secondary>
    <input
      style={{ display: "none" }}
      type="file"
      accept="image/*"
      onChange={handleChange}
      name="media"
      ref={inputRef}
    ></input> */
}
{
  /* Since this input's display is none, we're using inputRef to open it 

    '/*' means we're accepting images of all file types */
}

//     <div
//       onDragOver={(e) => {
//         e.preventDefault();
//         setHighlighted(true);
//       }}
//       onDragLeave={(e) => {
//         e.preventDefault();
//         setHighlighted(false);
//       }}
//       onDrop={(e) => {
//         e.preventDefault(); //if we don't use this code, browser starts downloading the image
//         setHighlighted(true);
//         //   console.log(e.dataTransfer.files); e.dataTransfer.files is a list of all the files being dragged
//         const droppedFile = Array.from(e.dataTransfer.files); //converts the image in filelist format to an Array
//         setMedia(droppedFile[0]); //first element in array is the image the user has dropped
//         setMediaPreview(URL.createObjectURL(droppedFile[0]));
//       }}
//     >
//       {mediaPreview === null || profilePicUrl === null || profilePicUrl === "" ? (
//         <>
//           <Segment color={highlighted ? "green" : ""} placeholder basic>
//             {signupRoute ? (
//               <Header icon>
//                 <Icon
//                   name="file image outline"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => inputRef.current.click()}
//                 ></Icon>
//                 Drag and Drop or Click to Upload Image
//               </Header>
//             ) : (
//               <span style={{ textAlign: "center" }}>
//                 <Image
//                   src={profilePicUrl}
//                   style={{ cursor: "pointer" }}
//                   onClick={() => inputRef.current.click()}
//                   size="huge"
//                   centered
//                 ></Image>
//               </span>
//             )}
//           </Segment>
//         </>
//       ) : (
//         <>
//           <Segment color="green" placeholder basic>
//             <Image
//               src={mediaPreview}
//               size="medium"
//               centered
//               style={{ cursor: "pointer" }}
//               onClick={() => inputRef.current.click()}
//             ></Image>
//           </Segment>
//         </>
//       )}
//     </div>
//   </Segment>
// </Form.Field>
// </>
