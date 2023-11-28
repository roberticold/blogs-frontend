import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();


  const obj={
    email:email
  }
  
 const handleChangePassword=(e)=>{
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_BACKEND_ADDRESS}/getresetpasswordemail`,obj)
    .then(()=>{
        navigate("/emailsent");


    }).catch(()=>{
        toast.error("This email does not exist. Please create an account", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

    })
 }
  
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
        <h2 style={{marginBottom:"15px"}}>Reset Password</h2>
        <form onSubmit={(e) => handleChangePassword(e)}>
          
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            required
            
          />
          <div className="showpasswordcheckboxwraper">
          
          </div>
          <div className="signup-wrapper">
            <div className="right">
              <button type="submit" className="signin-btn">
                Reset
              </button>
            </div>
           
            
          </div>
          
        </form>
        
        
      </div>
      
    </>
  );
};

export default ResetPasswordRequest;
