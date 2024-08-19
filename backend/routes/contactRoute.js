const express = require("express");
const router = express.Router();
const { getTotalContacts, createContact, deleteContact, getContact, updateContact } = require("../controller/contactController");
// const { fetchContacts } = require("../../frontend/src/Redux/ContactSlice");

router.get("/", getTotalContacts);
router.post("/createcontact", createContact);
router.delete("/:id", deleteContact);
router.get("/:id", getContact);
router.put("/:id", updateContact);


module.exports = router;
