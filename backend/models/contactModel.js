const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true}
});

module.exports = mongoose.model("contacts", contactSchema)