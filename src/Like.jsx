import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

const Like = ({ blogId }) => {
  const [isLiked, setIsLiked] = useState();
  const [totalLikes, setTotaLikes] = useState();
  const [newInfo, setNewInfo] = useState(true);

  const obj = {
    blogId: blogId,
    userId: sessionStorage.getItem("id"),
    likeStatus: isLiked ? 0 : 1,
  };

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/blog/get/likes`, obj)

      .then((response) => {
        setIsLiked(response.data.like_status);
        setTotaLikes(response.data.total_likes);
      });
  }, [newInfo]);

  const handleLike = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/blog/post/like`, obj)

      .then(() => {
        newInfo ? setNewInfo(false) : setNewInfo(true);
      });
  };

  return (
    <div className="totalLikes">
      <div>
        {isLiked ? (
          <FcLike onClick={handleLike} className="like-btn" size="20" />
        ) : (
          <AiOutlineHeart onClick={handleLike} className="like-btn" size="20" />
        )}
      </div>
      <div className='totalLikesSize'>
        {totalLikes} {totalLikes > 1 || totalLikes == 0 ? "likes" : "like"}
      </div>
    </div>
  );
};

export default Like;
