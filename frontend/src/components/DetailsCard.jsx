/* eslint-disable react/prop-types */
// import React from 'react'
import { GrEdit } from "react-icons/gr";
// import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
// import DeleteForm from "./DeleteForm";
// import { useDispatch } from "react-redux";
// import { deleteContact } from "../Redux/ContactSlice";

const DetailsCard = ({ contact, onEdit, start, onDelete }) => {

    const handleDelete = () => {
        onDelete(contact._id);
    };

    return (
        <>
            <tr style={{ borderCollapse: "unset", borderRadius: "10px", color: "dimgrey", backgroundColor: "#FFF" }}>
                <th className="rounded-l-lg">{`#${start}`}</th>
                <td>{contact.fullName}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>{contact.address}</td>
                {/* <td className="pl-6"><a href=""><FaRegHeart/><FaHeart/></a></td> */}
                <td className="!rounded-r-lg">
                    <span className="flex gap-3 ">
                        <button className="action-btn" onClick={onEdit} style={{ backgroundColor: "#6EACDA" }}><GrEdit /></button>
                        <button className="action-btn" onClick={handleDelete} style={{ backgroundColor: "#FD8A8A" }}><MdDeleteForever /></button>
                    </span>
                </td>
            </tr>
            
        </>
    )
}

export default DetailsCard