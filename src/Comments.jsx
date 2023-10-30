import React from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import ModalComments from "./ModalComments";
import { useState, useEffect } from "react";

const Comments = ({blogId,profilePhoto}) => {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  return (
    <>
       

      <div onClick={handleModal} className="comments-wrapper">
      
        <FaRegCommentAlt size="16" />
        <div className="comments-text">comments</div>
        
      </div>
      
      {modal && <ModalComments profilePhoto={profilePhoto} blogId={blogId} handleModal={handleModal} setModal={setModal} />}
      
      
    </>
  );
};

export default Comments;
