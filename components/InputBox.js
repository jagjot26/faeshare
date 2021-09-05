import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { CameraIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Public } from "@material-ui/icons";
import uploadPic from "../utils/uploadPic";
import { submitNewPost } from "../utils/postActions";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import InfoBox from "./HelperComponents/InfoBox";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function InputBox({ user, setPosts, increaseSizeAnim }) {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const filePickerRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textareaEnabled, setTextareaEnabled] = useState(false);
  const [newPost, setNewPost] = useState({
    postText: "",
    location: "",
  });

  const { postText, location } = newPost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const addImageFromDevice = (e) => {
    const { files } = e.target;
    setImage(files[0]); //files that we receive from e.target is automatically an array, so we don't need Array.from
    setImagePreview(URL.createObjectURL(files[0]));
  };

  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    let picUrl;

    if (image !== null) {
      picUrl = await uploadPic(image);
      console.log(picUrl);
      if (!picUrl) {
        setLoading(false);
        return setError("Error uploading image");
      }
    }

    await submitNewPost(
      newPost.postText,
      newPost.location,
      picUrl,
      setPosts,
      setNewPost,
      setError
    );

    setImage(null);
    setImagePreview(null);
    setLoading(false);
  };

  const FormBottomHalf = ({}) => {
    return (
      <>
        <span
          className="mt-5"
          style={{
            height: ".65px",
            backgroundColor: "lightgrey",
            margin: "0.1 1.1rem 0 1.1rem",
            display: "block",
          }}
        ></span>

        <div className="flex space-x-4 mt-2 ml-4 mr-4 justify-evenly items-center">
          <div
            className="flex flex-grow justify-center items-center hover:bg-gray-100 space-x-2 mb-2 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer"
            onClick={() => filePickerRef.current.click()}
          >
            <CameraIcon className="h-7  " />
            <input
              ref={filePickerRef}
              onChange={addImageFromDevice}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
            <p>Photo</p>
          </div>
          <button
            className="flex flex-grow justify-center items-center hover:bg-gray-100 space-x-2 mb-2 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer"
            type="submit"
            ref={buttonRef}
            onClick={createPost}
          >
            {loading ? (
              <>
                <Loader
                  type="Puff"
                  color="black"
                  height={20}
                  width={20}
                  timeout={5000} //3 secs
                />
              </>
            ) : (
              <>
                <ArrowSmRightIcon className="h-7" />
                <p>Post</p>
              </>
            )}
          </button>
        </div>
      </>
    );
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      buttonRef.current.click();
    }
  };

  return (
    <div>
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
        className="bg-white rounded-2xl mt-3 mb-10"
      >
        {textareaEnabled ? (
          <>
            <div className="pt-6 pl-6 pr-6">
              <div className="flex space-x-4 items-center">
                <Image src={user.profilePicUrl} alt="profile pic" />
                <div>
                  <p style={{ marginBottom: "0rem", fontWeight: "600" }}>
                    {user.name}
                  </p>
                  <div className="flex text-gray-500 text-sm space-x-1 items-center">
                    <Public style={{ fontSize: "1rem" }} />
                    <p>Public</p>
                  </div>
                </div>
              </div>

              <form className="w-full mt-5 flex flex-col justify-evenly">
                <div
                  className={`p-3.5 bg-gray-100 rounded-xl items-center ${increaseSizeAnim.sizeIncDown} `}
                >
                  <InputTextarea
                    name="postText"
                    value={postText}
                    type="text"
                    rows="4"
                    maxlength="4"
                    onChange={handleChange}
                    className={`outline-none w-full bg-transparent font-light text-md placeholder-gray-400 text-lg `}
                    placeholder={`What's on your mind, ${user.name}?`}
                    onKeyDown={onEnterPress}
                  ></InputTextarea>
                  <ChevronUpIcon
                    className="h-6 w-6 cursor-pointer text-gray-500 ml-auto"
                    onClick={() => {
                      setTextareaEnabled(false);
                    }}
                  />
                </div>
                {imagePreview && (
                  <>
                    <ImageContainerDiv
                      style={{ marginTop: "1.15rem", marginBottom: "-1.2rem" }}
                    >
                      <ImagePreviewDiv
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                      >
                        <XIcon className="h-6 text-gray-700" />
                      </ImagePreviewDiv>
                      <ImagePreview
                        src={imagePreview}
                        alt="imagePreview"
                      ></ImagePreview>
                    </ImageContainerDiv>
                  </>
                )}
                <FormBottomHalf />
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center pt-6 pl-6 pr-6">
              <form className="w-full">
                {/* div which contains the profilepic and the input div */}
                <div className="flex w-full space-x-4 items-center">
                  <Image src={user.profilePicUrl} alt="profile pic" />
                  <div
                    className={`flex p-3.5 bg-gray-100 rounded-full items-center w-full ${increaseSizeAnim.sizeIncUp}`}
                  >
                    <input
                      name="postText"
                      value={postText}
                      onChange={handleChange}
                      className="outline-none w-full bg-transparent font-light text-md placeholder-gray-400 text-lg"
                      type="text"
                      placeholder={`What's on your mind, ${user.name}?`}
                    ></input>
                    <ChevronDownIcon
                      className="h-7 w-7 cursor-pointer text-gray-500"
                      onClick={() => {
                        setTextareaEnabled(true);
                      }}
                    />
                  </div>
                </div>

                {imagePreview && (
                  <>
                    <ImageContainerDiv
                      style={{ marginTop: "1.125rem", marginBottom: "-.25rem" }}
                    >
                      <ImagePreviewDiv
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                      >
                        <XIcon className="h-6 text-gray-700" />
                      </ImagePreviewDiv>
                      <ImagePreview
                        src={imagePreview}
                        alt="imagePreview"
                      ></ImagePreview>
                    </ImageContainerDiv>
                  </>
                )}
                <FormBottomHalf />
              </form>
            </div>
          </>
        )}
      </div>
      {error && (
        <InfoBox
          Icon={ExclamationCircleIcon}
          message={"Sorry, the post wasn't submitted"}
          content={error}
          setError={setError}
        />
      )}
    </div>
  );
}

export default InputBox;
const ImagePreviewDiv = styled.div`
  cursor: pointer;
  position: absolute;
  top: 4.5%;
  right: 6.5%;
  padding: 0.3rem;
  background-color: white;
  border-radius: 50%;
  z-index: 70;
`;

const ImagePreview = styled.img`
  object-fit: contain;
  height: 300px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.2rem;
  transition: all 0.22s ease-out;
`;

const ImageContainerDiv = styled.div`
  position: relative;
  & ${ImagePreviewDiv}:hover + ${ImagePreview} {
    opacity: 0.55;
    filter: brightness(107%) contrast(80%);
  }
`;

const Image = styled.img`
  object-fit: cover;
  height: 2.95rem;
  width: 2.95rem;
  border-radius: 50%;
`;

const InputTextarea = styled.textarea`
  resize: none;
`;
