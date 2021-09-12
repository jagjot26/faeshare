import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import { EmojiSadIcon } from "@heroicons/react/outline";
import InfoBox from "./HelperComponents/InfoBox";
import { RefreshIcon } from "@heroicons/react/outline";
import InfiniteScroll from "react-infinite-scroll-component"; //for infinite scrolling
import { PlaceHolderPosts } from "./HelperComponents/Placeholders";
import PostCard from "./PostCard";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import cookie from "js-cookie";
import { Facebook } from "react-content-loader";

function Feed({ user, postsData, errorLoading, increaseSizeAnim }) {
  const [posts, setPosts] = useState(postsData);
  const [hasMore, setHasMore] = useState(true); //means if there is more data to fetch frm backend, then it'll be true
  const [pageNumber, setPageNumber] = useState(2); //we set it to 2 initially because from getInitialProps below, posts of pageNumber 1 have already been fetched. So now, it's set to pageNumber 2 for next pagination call

  // useEffect(() => {
  //   showToaster && setTimeout(() => setShowToaster(false), 3000);
  //   //if showToastr is true, setShowToastr to false after 3s
  // }, [showToaster]);

  const fetchDataOnScroll = async () => {
    try {
      console.log(`no. of posts on feed: ${posts.length}`);
      const res = await axios.get(`${baseUrl}/api/posts`, {
        headers: { Authorization: cookie.get("token") },
        params: { pageNumber: pageNumber },
        // params sent using ^ are received on backend with req.query
        // or we could've done: `${baseUrl}/api/posts/${pageNumber}`
      });

      if (res.data.length === 0) {
        setHasMore(false); //for stopping function call (inside of InfinitScroll component) after all posts have been fetched
      }

      //if more posts are there
      setPosts((prev) => [...prev, ...res.data]);
      setPageNumber((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      alert("Error fetching posts");
    }
  };

  return (
    <>
      <div className="flex-grow h-full pt-6 mr-5 md:ml-auto  scrollbar-hide">
        <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
          <InputBox
            user={user}
            setPosts={setPosts}
            increaseSizeAnim={increaseSizeAnim}
          />

          {posts ? (
            posts.length === 0 || errorLoading ? (
              <InfoBox
                Icon={EmojiSadIcon}
                message="Sorry, no posts..."
                content="Please follow another user or create a new post to start seeing posts."
              ></InfoBox>
            ) : (
              <InfiniteScroll
                /* next is the function for fetching data from backend when the user reaches the end */
                hasMore={hasMore}
                next={fetchDataOnScroll}
                loader={<Facebook />}
                endMessage={
                  <div className="w-full mt-6 mb-6">
                    <RefreshIcon className="h-7 mx-auto" />
                  </div>
                }
                dataLength={posts.length}
                // end message is the component which will get displayed when no more posts to be fetched from backend
              >
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    user={user}
                    setPosts={setPosts}
                  />
                ))}
              </InfiniteScroll>
            )
          ) : (
            <Facebook />
          )}
        </div>
      </div>
    </>
  );
}

export default Feed;
