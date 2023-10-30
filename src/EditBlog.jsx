import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditBlog = ({newInfo}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState()
  
  
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_ADDRESS}/blog/` + id).then((response) => {
      setTitle(response.data.title);
      setBody(response.data.body);
      setImage(response.data.image);
      
      
    });
  }, []);

  const handleSendImage = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sgrdc6ai");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/personal-cloud/image/upload",
        formData
      )
      .then((response) => setImage(response.data.secure_url))
      .catch((error) => {});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body,image};
    axios.put(`${import.meta.env.VITE_BACKEND_ADDRESS}/blog/edit/` + id, blog).then(()=>{
      newInfo()
    navigate("/");
    })
    

  };
  return (
    <div className="create">
      <h2>Edit the Blog</h2>
      <div className="image-create-container">

      <img className="image-create-blog" src={image} alt="" />
      </div>
      <input
        className="choose-image"
        type="file"
        name="image"
        onChange={handleSendImage}
      />
      <form onSubmit={handleSubmit}>
        <label>Title:</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Body:</label>
        <textarea
          rows="15"
          id="textarea1"
          required
          style={{ resize: "none",height:"auto", width:"100%" }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
       
        <button className='submit-edited-btn' type="submit">Submit edited Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
