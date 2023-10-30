

import NavbarModal from "./navbarModal";
import { Link } from "react-router-dom";
import { useState } from "react";




const Navbar = ({ windowsSize, dataLength, handleLogout,profilePhoto}) => {
 
  const [isModal, setIsModal] = useState(false);
  

  

  const handleModal = () => {
     isModal ? setIsModal(false) : setIsModal(true);
  };

  return (
    <div  className='div-navbar-wrapper' >
      <nav  className='navbar'>
        <Link className='blog-image-navbar-link' to='/'>
        <img
          className="blog-image"
          src="https://res.cloudinary.com/personal-cloud/image/upload/v1697747162/fixed_xuzkjs.jpg"
          alt=""
          
        />
        </Link>

        {/* {windowsSize.width} */}
        <div className="blogs-counter">{dataLength}</div>
        {windowsSize.width > 482 && (
          <div className="links">
            <Link className="Home-link" to="/">Home</Link>
            <Link className="Create-link" to="/create">Create Blog</Link>

            <img
              className="photo-profile"
              onClick={handleModal}
              title={sessionStorage.getItem('username')}
              src={profilePhoto}
              alt=""
            />
          </div>
        )}

        {windowsSize.width < 483 && (
          <img
            className="photo-profile"
            onClick={handleModal}
            title={sessionStorage.getItem('username')}
            src={profilePhoto}
            alt=""
          />
        )}
      </nav>
      {isModal && <NavbarModal
      
     
        handleModal={handleModal}
        windowsSize={windowsSize}
        handleLogout={handleLogout}
        navbarUserPhoto={profilePhoto}
        navbarUsername={sessionStorage.getItem('username')}
        navbarEmail={sessionStorage.getItem('email')}
        setIsModal={setIsModal}
      />}
      
    </div>
  );
};

export default Navbar;
