import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [email, setEmail] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const changeType=()=>{

    passwordType=="password"? setPasswordType("text"):setPasswordType("password")

  }

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
      const newUser = {
        username: username,
        password: password,
        email: email,
      };
      axios
        .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/register`, newUser)

        .then((response) => {
          navigate("/");

         
        })
        .catch((error) => {
          
          toast.error("This email and/or password already exist.", {
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Username</label>
          <input
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type={passwordType}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            type={passwordType}
            required
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <div className="showpasswordcheckboxwraper">
          <div className='showpasswordcheckbox'><input type="checkbox" onClick={changeType}/></div>
          <div className="showpasswordtext">Show Password</div>
          </div>
          <div className="signup-wrapper">
            <div className="right">
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </div>
            <div className="center">
              <Link className="linktosignin" to={"/"}>
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
