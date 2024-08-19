const contactModel = require("../models/contactModel");
exports.getTotalContacts = async (searchQuery, activePage, limit) => {
    const pipeline = [];
    if (searchQuery) {
        pipeline.push({
            $match: {
                $or: [
                    { fullName: { $regex: searchQuery, $options: 'i' } },
                    { phone: { $regex: searchQuery, $options: 'i' } },
                    { email: { $regex: searchQuery, $options: 'i' } }
                ]
            }
        })
    }
    pipeline.push(
        { $sort: { createdAt: -1 } },
        {
            $facet: {
                data: [{ $skip: (activePage - 1) * limit }, { $limit: limit}],
                totalCount: [{ $count: "count" }]
            }
        }
    );

    const result = await contactModel.aggregate(pipeline);
    const datas = result[0].data;
    const totalDatas = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
    const totalPages = Math.ceil(totalDatas / limit);
    const start =( activePage - 1) * limit;
    // searchResult = result[0].searchQuery;

    return { datas, totalDatas, totalPages, start};
}


exports.createContact = async (contactData) => {
    const { fullName, phone, email, address } = contactData;
    if (!fullName || !phone || !email || !address) {
      throw new Error('All fields are required');
    }
  
    const newContact = new contactModel({
      fullName,  
      phone,
      email,
      address,
    });
    await newContact.save();
    // console.log(newContact);
    return newContact;
}; 

//Get contact
exports.getContact = async (contactId) => {
    const contact = await contactModel.findById(contactId);
    if(!contact) {
        throw new Error("Contact not found");
    }
    return contact
};

// Delete contact
exports.deleteContact = async (contactId) => {
    const contact = await contactModel.findByIdAndDelete(contactId);
    if(!contact) {
        throw new Error("Contact not found");
    }
    return contact
};  

//Edit contact
exports.updateContact = async (contactId, contactData) => {
    const updatedContact = await contactModel.findByIdAndUpdate(contactId, contactData, { new: true });
    if (!updatedContact) {
        throw new Error("Contact not found");
    }
    return updatedContact;
};
