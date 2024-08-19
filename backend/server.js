const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();
connectDb();
const PORT = process.env.PORT || 4001;

app.use("/contacts", require("./routes/contactRoute"));

app.listen( PORT, () => {
    console.log(`Server started at: http//localhost:${PORT}`);
})