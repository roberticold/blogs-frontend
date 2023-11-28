import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

const EmailSent = () => {
  
  
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
        <h2 style={{marginBottom:"15px",fontWeight:"normal",fontSize:"19px"}}>A link has been sent to your email now to reset your password</h2>
        
        
        
      </div>
      
    </>
  );
};

export default EmailSent
