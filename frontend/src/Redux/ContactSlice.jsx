import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4001/contacts";

export const fetchContacts = createAsyncThunk(
  "fetchContacts",
  async ({ activePage, limit, searchQuery }, { rejectWithValue }) => {
    console.log("Fetching contacts")
    try {
      const response = await axios.get(API_URL, {
        params: { activePage, limit, searchQuery }
      });
      console.log("res",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (contact, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/createcontact`, contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ( updatedContact, { rejectWithValue }) => {
    try {

      const response = await axios.put(`${API_URL}/${updatedContact._id}`, updatedContact);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);  

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    loading: false,
    status: 'loading',
    error: null,
    totalPages: 1,
    totalData: 0,
    start: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.datas;
        state.totalPages = action.payload.totalPages;
        state.totalDatas = action.payload.totalDatas;
        state.start = action.payload.start;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.unshift(action.payload.contact);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(contact => contact._id === action.payload.contact._id);
        if (index !== -1) {
          state.contacts[index] = action.payload.contact;
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact._id !== action.payload.contact._id);
      });
  }
});

export default contactSlice.reducer;