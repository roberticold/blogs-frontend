
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { useRef, useEffect} from "react";

const navbarModal = ({
  navbarUserPhoto,
    handleLogout,
  windowsSize,
  handleModal,
  setIsModal,
}) => {
   const menuRef = useRef();

 

  useEffect(()=>{

    document.addEventListener('mousedown',closeOnClickOutside)

    return ()=>{
      document.removeEventListener('mousedown',closeOnClickOutside)
    }
    
  },[])

 function closeOnClickOutside(event){
  if(!menuRef.current.contains(event.target) && event.target.className!="photo-profile"){
    setIsModal(false)
  }
 }



  return (
    <>
      <div ref={menuRef} className="modal-wrapper">
        <div className={"div-containing-modal"}>
          <div className="div-containing-modal-1">
            <div className="padding-down">
              <img className="photo-modal" src={navbarUserPhoto} alt="" />
            </div>

            <div className="space-items-navbar-modal">{sessionStorage.getItem('username')}</div>
            <div className="space-items-navbar-modal">{sessionStorage.getItem('email')}</div>
          </div>
          <div className="div-containing-modal-2">
            {windowsSize.width <= 481 && (
              <>
                <Link className="modal-home" onClick={handleModal} to="/">
                  <AiOutlineHome
                    onClick={handleModal}
                    className="home-icon"
                    style={{ paddingRight: 10 }}
                    size={14}
                  />
                  Home
                </Link>

                <Link
                  className="modal-create"
                  onClick={handleModal}
                  to="/create"
                >
                  <IoCreateOutline
                    onClick={handleModal}
                    style={{ paddingRight: 10 }}
                    size={14}
                    className="create-icon"
                  />
                  Create Blog
                </Link>
              </>
            )}

            <Link className="modal-logout" onClick={handleLogout} to="/">
              <BiLogOut
                style={{ paddingRight: 10 }}
                size={15}
                className="logout-icon"
              />
              Logout
            </Link>

            <Link className="modal-settings" onClick={handleModal} to="/settings">
              <IoIosSettings
                style={{ paddingRight: 10 }}
                size={15}
                className="settings-icon"
              />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default navbarModal;
