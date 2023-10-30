import React from "react";
import { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsSend } from "react-icons/bs";
import axios from "axios";

const ModalComments = ({ handleModal, setModal, blogId, profilePhoto }) => {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [fetch, setFetch] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_ADDRESS}/comments/${blogId}`)

      .then((response) => {
        setMessages(response.data.blogs);
      })
      .catch((error) => {});

    document.addEventListener("mousedown", closeOnClickOutside);

    return () => {
      document.removeEventListener("mousedown", closeOnClickOutside);
    };
  }, [fetch]);

  function closeOnClickOutside(event) {
    if (!modalRef.current.contains(event.target)) {
      setModal(false);
    }
  }

  const handleSendMessage = () => {
    const newMessage = {
      body: message,
      blog_id: blogId,
      user_id: sessionStorage.getItem("id"),
    };

    // this part of the code is for optimization
    setMessages([...messages, newMessage]);
    newMessage.username = sessionStorage.getItem("username");
    newMessage.photo = profilePhoto;

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/comment`, newMessage)

      .then((response) => {
        fetch ? setFetch(false) : setFetch(true);
        setMessage("");
      })
      .catch((error) => {});
  };

  const handleDeleteComment = (id) => {
    
    // this part of the code is for optimization
    const newMessages = messages.filter((message) => message.id != id);
    setMessages(newMessages);

    axios
      .delete(`${import.meta.env.VITE_BACKEND_ADDRESS}/comment/delete/${id}`)

      .then((response) => {
        fetch ? setFetch(false) : setFetch(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div ref={modalRef} className="modal-comments-wrapper">
      <div className="closing-x-comments-modal">
        <AiOutlineClose onClick={handleModal} />
      </div>
      <div className="messages-showing-place-wrapper">
        {messages.map((message) => (
          <div key={message.id} className="messages-showing-place">
            <div className="photo-comment-section">
              <img
                className="photo-profile-message"
                title={message.username}
                src={message.photo}
                alt=""
              />
            </div>
            <div className="name-text-section">
              <div className="name-comments">
                {message.username}
              </div>
              <p className="text-comments">{message.body}</p>
              <div className="line-separate"></div>
            </div>
            {message.username == sessionStorage.getItem("username") && (
              <div className="delete-message-btn-wrapper">
                <div
                  className="delete-message-btn"
                  onClick={() => handleDeleteComment(message.id)}
                >
                  <RiDeleteBinLine className="delete-message-icon" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="write-comment">
        <img
          className="photo-profile-message"
          title={sessionStorage.getItem("username")}
          src={profilePhoto}
          alt=""
        />
        <input
          className="input-comments"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
        />
        <div className="send-message" onClick={handleSendMessage}>
          <BsSend size="20" className="send-message-icon" />
        </div>
      </div>
    </div>
  );
};

export default ModalComments;
