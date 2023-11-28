import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

const ResetPasswordChange = () => {
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const changeType = () => {
    passwordType == "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != confPassword) {
      toast.error("The passwords dont match!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const newPassword = {
        password: password,
      };
      const bearertoken={
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      axios
        .put(`${import.meta.env.VITE_BACKEND_ADDRESS}/reset_password`, newPassword,bearertoken )

        .then((response) => {
            
            toast.success(response.data.message+"!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
          navigate("/");
        })
        .catch((error) => {
            
          toast.error("Token Expired!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };
  return (
    <>
      <div className="create login">
        <div className="blog-image-signIn-wrapper">
          <img
            className="blog-image-signIn"
            src="https://res.cloudinary.com/personal-cloud/image/upload/v1697747162/fixed_xuzkjs.jpg"
            alt=""
          />
        </div>
        <h2 style={{ marginBottom: "20px" }}>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type={passwordType}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm New Password</label>
          <input
            type={passwordType}
            required
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <div className="showpasswordcheckboxwraper">
            <div className="showpasswordcheckbox">
              <input type="checkbox" onClick={changeType} />
            </div>
            <div className="showpasswordtext">Show Password</div>
          </div>
          <div className="signup-wrapper">
            <div className="right">
              <button type="submit" className="signup-btn">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordChange;
