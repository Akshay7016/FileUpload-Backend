// Create app instance
const express = require("express");
const app = express();

// PORT
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
// middleware for file uploading
const fileupload = require("express-fileupload");
app.use(fileupload());

// Database connection
const dbConnect = require("./config/database");
dbConnect();

// Cloudinary connection
const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect();

// Route mount
const upload = require("./routes/FileUpload");
app.use("/api/v1/upload", upload);

// Active server
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
})
