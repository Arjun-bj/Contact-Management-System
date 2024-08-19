// import React from 'react'
import { HiOutlineUsers } from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";
// import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { RiContactsLine } from "react-icons/ri";
import profile from "../assets/User-Profile-PNG-Image.png"

const SideBar = () => {
  return (
    <div className="sideBar flex-properties1">
      <div className="flex items-center text-2xl p-3 gap-2 mt-3" style={{color: "#FFF", fontWeight: "500"}}>
        <RiContactsLine/>
        <h1>Contact List</h1>
      </div>
        <ul className="flex-properties1 py-4">
            <li><a href="#"><HiOutlineUsers/> Contacts</a></li>
            <li><a href="#"><LuLayoutDashboard/> Dashboard</a></li>
            {/* <li><a href="#"><FaRegUser style={{fontSize: "18px"}}/>Profile</a></li> */}
            <li><a href="#"><IoSettingsOutline/>Settings</a></li>
        </ul>
        <div className="text-white flex-properties1 items-center p-3 mb-4 gap-2">
          <span className="profileImg flex-properties">
            <img className="max-w-full" src={profile} alt="" />
          </span>
          <h4>John doe</h4>
          <h6 className="text-sm">johndoe@gmail.com</h6>
        </div>
        <button className="mb-3"><IoLogOutOutline style={{fontSize: "25px"}}/>Logout</button>
    </div>
  )
}

export default SideBar