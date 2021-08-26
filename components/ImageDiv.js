import React from "react";
import styled from "styled-components";
import uploadPic from "../utils/uploadPic";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function ImageDiv({
  mediaPreview,
  setMediaPreview,
  setMedia,
  inputRef,
  highlighted,
  setHighlighted,
  handleImage,
}) {
  return (
    <>
      <ImageContainer>
        <ImageInput
          type="file"
          accept="image/*"
          onChange={handleImage}
          name="media"
          ref={inputRef}
        ></ImageInput>
        <AddCircleOutlineIcon style={{ position: "absolute" }} />
      </ImageContainer>
    </>
  );
}

export default ImageDiv;

const ImageContainer = styled.div`
  position: relative;
`;

const ImageInput = styled.input`
  display: none;
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
