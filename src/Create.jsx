import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = ({ newInfo, setData,data }) => {
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(
    "https://cloudinary-marketing-res.cloudinary.com/image/upload/w_1000/q_35/f_auto/lake_wanaka_NZ.jpg"
  );
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const author = sessionStorage.getItem("id");
    const blog = { title, body, author, image };
    // this part is to optimize speed
    setData([...data,blog])


    axios.post(`${import.meta.env.VITE_BACKEND_ADDRESS}/create`, blog).then(() => {
      newInfo();
      navigate("/");
    });
  };

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

  return (
    <div className="create">
      <h2>Create a New Blog</h2>
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
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Body:</label>
        <textarea
          rows="15"
          id="textarea1"
          outline="none"
          required
          style={{ resize: "none",height:"auto", width:"100%" }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <button className="add-blog-btn" type="submit">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default Create;
