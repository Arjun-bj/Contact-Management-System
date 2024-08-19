
import TableBody from './TableBody'
import Footer from './Footer';
import Form from './Form';
import { FaRegBell, FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../Redux/ContactSlice';
import DeleteForm from './DeleteForm';
import { toast, Zoom } from "react-toastify"


const MainContentArea = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const { contacts, totalPages } = useSelector((state) => state.contacts);
  console.log(contacts);

useEffect(() => {
  const handler = setTimeout(() => {
  dispatch(fetchContacts({ activePage: page, limit, searchQuery }))
  }, 1000);

  return () => {
    clearTimeout(handler);
  };
}, [dispatch, page, limit, searchQuery]);

const handleSearch = (e) => {
  setSearchQuery(e.target.value);
  setPage(1);
};

const handlePageChange = (newPage) => {
  if (newPage > 0 && newPage <= totalPages) {
    setPage(newPage);
  }
};

const showCreateForm = () => {
  setFormMode("create");
  setSelectedContact(null);
  setShowForm(true);
};

const showEditForm = (contact) => {
  setFormMode("edit");
  setSelectedContact(contact);
  setShowForm(true);
};

const handleCloseForm = () => {
  setShowForm(false);
  setSelectedContact(null);
}

const handleDeleteContact = (contactId) => {
  setShowDeleteForm(contactId); 
};

const confirmDeleteContact = () => {
  if (showDeleteForm) {
    dispatch(deleteContact(showDeleteForm));
    toast.success("Contact deleted successfully", {
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
    setShowDeleteForm(false);
  }
};

const cancelDelete = () => {
  setShowDeleteForm(null);
};

return (
  <>
    <div className='mainContent flex-properties1'>
      <div style={{ backgroundColor: "#FFF", borderRadius: "12px", padding: "20px" }}>
        <div className='flex-between items-center'>
          <h1 className='text-4xl font-medium'>Contacts</h1>
          <div className='flex items-center gap-2.5'>
            <div className='flex items-center' >
              <div className='py-1.5 px-2 rounded-full flex items-center' style={{ backgroundColor: "#F4F7FE", border: "1px solid var(--tt-bordergrey)" }}>
                <input value={searchQuery} onChange={handleSearch} className='searchInput outline-none py-2.5 px-3  text-sm' style={{ backgroundColor: "#F4F7FE" }} type="search" placeholder='Search here' />
                <span style={{ color: "#8B95B7" }} className='px-2'><FaSearch /></span>
              </div>
            </div>
            <span className='text-lg' style={{ backgroundColor: "#F4F7FE", borderRadius: "50%", padding: "17px", color: "#8B95B7", border: "1px solid var(--tt-bordergrey)" }}><FaRegBell /></span>
          </div>
        </div>
        <div className='flex-between flex-row pt-4'>
          <div className='flex-properties list'>
            <h5>List</h5>
            <select name="" id="" value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
          </div>
          <button type='button' onClick={showCreateForm} style={{ backgroundColor: "var(--tt-softBlue)", fontSize: "18px" }}>Create contact</button>
        </div>
      </div>
      <div className='flex-between flex-column flex-1'>
        <TableBody onEdit={showEditForm} onDelete={handleDeleteContact} />
        <Footer setPage={setPage} totalPages={totalPages} limit={limit} onPageChange={handlePageChange} />
      </div>
    </div>
    {showForm && <Form mode={formMode} contact={selectedContact} onClose={handleCloseForm} />}
    {showDeleteForm && <DeleteForm handleConfirmDelete={confirmDeleteContact} handleToogle={cancelDelete} />}
  </>
)
}

export default MainContentArea