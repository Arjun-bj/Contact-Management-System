/* eslint-disable react/prop-types */
// import React from 'react'
import { TiWarning } from "react-icons/ti";
// import { IoClose } from "react-icons/io5";

const DeleteForm = ({ handleConfirmDelete, handleToogle }) => {
  
  return (
    <>
      <div className="overlay"></div>
      <div className="delete-form">
        <div className="flex-properties1 items-center gap-4">
          <div style={{ color: "#FD8A8A", fontSize: "80px" }}>
            <TiWarning />
          </div>
          <h2 style={{ color: "#8B95B7", textAlign: "center" }}>Are you sure you want to delete this contact?</h2>
          <div className="flex-properties gap-4 mt-6 w-full">
            <button onClick={handleToogle} className="cancel-btn w-full">Cancel</button>
            <button onClick={handleConfirmDelete} style={{ backgroundColor: "#FD8A8A", width: "100%" }}>Delete</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteForm