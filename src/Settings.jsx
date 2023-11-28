import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalDeleteProfile from "./ModalDeleteProfile";

const Settings = ({ setProfilePhoto, newInfo }) => {
  const [newEmail, setNewEmail] = useState();
  const [confirmEmail, setConfirmEmail] = useState();
  const [imagePreview, setImagePreview] = useState(
    "https://res.cloudinary.com/personal-cloud/image/upload/v1622763605/Sportify%20Images/photo_ebtvt9.png"
  );
  const [image, setImage] = useState();

  const [modal, setModal] = useState(false);
  const id = sessionStorage.getItem("id");

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
      .then((response) => {
        setImage(response.data.secure_url);
        setImagePreview(response.data.secure_url);
      })
      .catch((error) => {});
  };

  const handleChangePhoto = () => {
    const photo = { id: id, photo: image };

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/photoUpdate`, photo)
      .then(() => {
        setProfilePhoto(image);
      });
  };

  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();

    if (newEmail == confirmEmail) {
      const blog = { id: id, email: newEmail };
      axios
        .put(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/emailUpdate`, blog)
        .then(() => {
          toast.success("Email changed successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setConfirmEmail(" ");
          setNewEmail(" ");
        });
    } else {
      console.log("the toast");
      toast.error("Emails dont match.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <h2 className="settingsH2">Settings</h2>
      <div className="settings-wrapper">
        <div className="change-photo-profile-wrapper">
          <p>Change Photo profile</p>
          <div className="photo-profile-card">
            <img
              className="photo-settings"
              title={sessionStorage.getItem("username")}
              src={imagePreview}
              alt=""
            />
            <input
              className="change-image"
              type="file"
              name="image"
              onChange={handleSendImage}
            />
            <div className="right">
              <button onClick={handleChangePhoto} className="signin-btn">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="change-credentials-wrapper">
          <p>Change Email</p>
          <div className="change-password-card">
            <form className="password-card-form" onSubmit={null}>
              <label>New Email</label>

              <input
                onChange={(e) => setNewEmail(e.target.value)}
                type="email"
                required
                value={newEmail}
              />

              <label>Confirm New Email</label>
              <input
                onChange={(e) => setConfirmEmail(e.target.value)}
                type="email"
                required
                className="settings-confirm-new-password"
                value={confirmEmail}
              />

              <div className="signup-wrapper">
                <div className="right">
                  <button onClick={handleChangeEmail} className="signin-btn">
                    Change
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="delete-profile-wrapper">
          <p>Delete profile</p>
          <div className="delete-profile-card">
            <button
              onClick={handleModal}
              className="signin-btn delete-profile-btn"
            >
              Delete
            </button>
          </div>
          {modal && (
            <ModalDeleteProfile
              handleModal={handleModal}
              id={sessionStorage.getItem("id")}
              newInfo={newInfo}
              setModal={setModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
