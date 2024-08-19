/* eslint-disable react/prop-types */
// import React from 'react'
import { IoClose } from "react-icons/io5";
import { createContact, updateContact } from "../Redux/ContactSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify"

const Form = ({ mode, contact, onClose }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    if (mode === "edit" && contact) {
      setFormData(contact);
    }
  }, [mode, contact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ""
    }));
  };

  const fromValidation = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Name is required!";
    if (!formData.phone) newErrors.phone = "Phone number is required!";
    if (!formData.email) newErrors.email = "Email is required!";
    if (!formData.address) newErrors.address = "Address is required!";
    return newErrors;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateErrors = fromValidation();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    if (mode === "edit") {
      console.log(formData);
      dispatch(updateContact(formData));
      toast.success("Contact edited successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
        style: {
          width: "350px",
          border: "1px solid grey"
        }
      });
    } else {
      dispatch(createContact(formData));
      toast.success("contact created successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
        style: {
          width: "350px",
          border: "1px solid grey"
        }
      });
    }
    // console.log(formData);

    onClose();
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      address: ''
    });
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="form-card">
        <div className="flex-between items-center text-2xl font-semibold pb-4">
          <h1>{mode === "edit" ? "Edit Contact" : "Create contact"}</h1>
          <span className="action-btn close-btn" onClick={onClose}><IoClose /></span>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="inputs">
            <div>
              <label>Full name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter name" />
              {errors.fullName && <span className="errorMsg">{errors.fullName}</span>}
            </div>
            <div>
              <label>Contact number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter conatct number" />
              {errors.phone && <span className="errorMsg">{errors.phone}</span>}
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" />
              {errors.email && <span className="errorMsg">{errors.email}</span>}
            </div>
            <div>
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" />
              {errors.address && <span className="errorMsg">{errors.address}</span>}
            </div>
          </div>
          <div className="flex-between w-full gap-10">
            <button className="form-btn w-full cancel-btn" onClick={onClose}>Cancel</button>
            {mode === "edit" ? <button type="submit" className="form-btn w-full" >Update</button>
              : <button type="submit" className="form-btn w-full" >Submit</button>}
          </div>
        </form>
      </div>
    </>
  )
}

export default Form
