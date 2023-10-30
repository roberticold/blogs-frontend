import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ModalDelete from "./ModalDelete";
import Comments from "./Comments";
import axios from "axios";
import Like from "./Like";

import { Link } from "react-router-dom";

const BlogDetails = ({ newInfo, profilePhoto, data, setData }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState();
  const modalRef = useRef();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_ADDRESS}/blog/` + id)
      .then((response) => {
        setTitle(response.data.title);
        setBody(response.data.body);
        setAuthor(response.data.author);
        setImage(response.data.image);

        setError(null);
      })

      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  return (
    <div>
      <div className="blog-details">
        {isLoading && <div>Loading...</div>}
        {error && <div>{error}</div>}

        {title && (
          <article>
            <div className="image-created-container">
              <img className="image-created-blog" src={image} alt="" />
            </div>
            <h2>{title}</h2>
            <p>Written by {author}</p>
            <textarea
            className="textarea-text"
              rows="15"
              style={{
                resize: "none",
                height: "auto",
                width: "100%",
                borderStyle: "none",
                outline: "none",
                marginTop: "15px",
              }}
            >
              {body}
            </textarea>
          </article>
        )}
      </div>
      {/* modal starts here */}
      {modal && (
        <ModalDelete
          data={data}
          setData={setData}
          handleModal={handleModal}
          id={id}
          setModal={setModal}
          newInfo={newInfo}
        />
      )}
      {/* modal finishes here */}
      <div>
        <div className="likes-comments-wrapper">
          <Like blogId={id} />
          <Comments blogId={id} profilePhoto={profilePhoto} />
        </div>

        {/* condition to show the delete and edit button */}

        {author === sessionStorage.getItem("username") && (
          <>
            <button className={"delete-Btn"} onClick={handleModal}>
              Delete
            </button>
            <Link className="links" to={`/edit/${id}`}>
              <button className="button-link">Edit</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
