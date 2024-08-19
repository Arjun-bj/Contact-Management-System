/* eslint-disable react/prop-types */
// import React from 'react'
import { useSelector } from "react-redux"
import DetailsCard from "./DetailsCard"
import errorImg from "../assets/user.png"
// import { FaAngleDown } from "react-icons/fa6"
// import { useEffect } from "react";
// import { fetchContacts } from "../Redux/ContactSlice";

const TableBody = ({ onEdit, onDelete }) => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchContacts());
    // }, [dispatch]);
    const contacts = useSelector(state => state.contacts.contacts);
    let start = useSelector(state => state.contacts.start);

    return (
        <div className="tableBody">
            <table className=" table-auto w-full">
                <thead>
                    <tr style={{ background: "none" }} className="table-header">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Phone </th>
                        <th>Email </th>
                        <th>Address </th>
                        {/* <th>Favourite</th> */}
                        <th>Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (contacts.length === 0) ? (
                            <tr>
                                <td colSpan="7" className="flex items-center gap-2 text-xl"><img className="w-8" src={errorImg} alt="" /> Contact not found!</td>
                            </tr>
                        ) : (
                            contacts.map((contact) => {
                                start++;
                                return (
                                    <DetailsCard key={contact._id} start={start} contact={contact} onEdit={() => onEdit(contact)} onDelete={onDelete} />
                                );
                                // <DetailsCard key={index} start={start+1}  contact={contact} onEdit={onEdit}/>
                            })
                        )
                    }

                </tbody>
            </table>
        </div>
    )
}


export default TableBody