/* eslint-disable react/prop-types */
// import React from 'react'
import { useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import ReactPaginate from "react-paginate"
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../Redux/ContactSlice";

const Footer = ({setPage, limit}) => {

  const dispatch = useDispatch();
  const pageCount = useSelector((state) => state.contacts.totalPages);
  useEffect(()=>{console.log("pagecount",pageCount);
  })
  const handlePageClick = (newPage) => {
    const data = newPage.selected + 1;
    setPage(data);
    dispatch(fetchContacts({currentPage: data , pageSize:limit}));
  };
  return (
    <footer className="pages flex justify-end py-4">
      <div className="footer-btns flex gap-3">
        <ReactPaginate
          breakLabel={<SlOptions/>}
          nextLabel={<FaAngleRight/>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={limit}
          pageCount={pageCount}
          previousLabel={<FaAngleLeft/>}
          renderOnZeroPageCount={null}
        /> 
      </div>
    </footer>
  )
}

export default Footer