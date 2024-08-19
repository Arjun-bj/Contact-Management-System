const asyncHandler = require("express-async-handler");
const contactService = require("../services/contactService");

//Get all contacts
const getTotalContacts = asyncHandler(async (req, res) => {
   try {
      const searchQuery = req.query.searchQuery || '';
      const activePage = parseInt(req.query.activePage)|| 1;
      const limit = parseInt(req.query.limit) || 5;

      const { datas, totalDatas, totalPages , start } = await contactService.getTotalContacts(searchQuery, activePage, limit);
      return res.status(200).json({ datas, totalPages, totalDatas , start});
   } catch (err) {
      return res.status(500).json({ message: err.message });
   }
})


//Create contact
 const createContact = asyncHandler(async (req, res) => {
    const contactData = req.body;
   //  console.log("Data received: " + contactData);
    const result  = await contactService.createContact(contactData);
    res.status(201).json({ message: "contact created successfully", contact: result });
 });

// Get contact
const getContact = asyncHandler(async (req, res) => {
   const contactId = req.params.id;
   const result = await contactService.getContact(contactId);
   res.status(200).json(result);
});

// Delete contact
const deleteContact = asyncHandler(async(req, res) => {
   const contactId = req.params.id;
   const result = await contactService.deleteContact(contactId);
   res.status(200).json({ message: "contact deleted successfully", contact: result});
});

//Edit contact
const updateContact = asyncHandler(async(req, res) => {
   console.log(req.params.id);
   const contactId = req.params.id;
   const contactData = req.body;
   console.log(contactData);
   const result = await contactService.updateContact(contactId, contactData);
   res.status(200).json({message:"contact updated successfully", contact: result});
});
 
 module.exports = { getTotalContacts, createContact, deleteContact, getContact, updateContact };
