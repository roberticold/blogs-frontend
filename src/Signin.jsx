import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signin = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordType, setPasswordType] = useState("password");

  const changeType=()=>{

    passwordType=="password"? setPasswordType("text"):setPasswordType("password")

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
        <h2>Sign In</h2>
        <form onSubmit={(e) => props.handleSignIn(e, username, password)}>
          <label>Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required
            
          />
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type={passwordType}
            required
            
          />
          <div className="showpasswordcheckboxwraper">
          <div className='showpasswordcheckbox'><input type="checkbox" onClick={changeType}/></div>
          <div className="showpasswordtext">Show Password</div>
          </div>
          <div className="signup-wrapper">
            <div className="right">
              <button type="submit" className="signin-btn">
                Sign In
              </button>
            </div>
            <div className="center">
              <Link className="linktosignin" to={"/signup"}>
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
