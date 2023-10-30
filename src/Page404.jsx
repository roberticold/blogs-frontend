import React from "react";
import { useNavigate } from "react-router-dom";


const Page404 = () => {
  const navigate = useNavigate();
  
  const hancldeClick = () => {
    navigate("/");
   
    
  };

  return (
    <div className="content-404">
      <div>404 Page not found</div>
      <button className="back-btn" onClick={hancldeClick}>
        Go back
      </button>
    </div>
  );
};

export default Page404;
