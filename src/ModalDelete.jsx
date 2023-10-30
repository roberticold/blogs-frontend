import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const ModalDelete = ({ data,setData,handleModal, setModal,id,newInfo }) => {
  const modalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("mousedown", closeOnClickOutside);

    return () => {
      document.removeEventListener("mousedown", closeOnClickOutside);
    };
  }, []);

  function closeOnClickOutside(event) {
    if (!modalRef.current.contains(event.target)) {
      setModal(false);
    }
  }

  const handleDelete = (blogid) => {
    // this part of the code is to optimize speed when deleting
    const newData = data.filter((blog)=> blog.id!=blogid)
    setData(newData)
    
    axios.delete(`${import.meta.env.VITE_BACKEND_ADDRESS}/blog/delete/` + blogid).then(() => {
      newInfo();
      navigate("/");
    });
  };
  return (
    <div ref={modalRef} className="modal-delete-wrapper">
      <div className="div-containing-delete-modal">
        <div className="close-btn-delete-modal">
          <div>
            <AiOutlineClose onClick={handleModal} />
          </div>
        </div>
        <div className="delete-modal-text">
          <h3 className='areYouSure'>Are you sure ?</h3>
          <div className="delete-modal-text-1">
            This process cannot be undone
          </div>
        </div>
        <div className="modal-delete-Btn">
          <button className="delete-Btn " onClick={() => handleDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
