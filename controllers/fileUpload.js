const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try {
        // fetch file from request
        const file = req.files.file;

        // create path where file need to be stored on server
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

        // add path to mv function
        file.mv(path, (error) => {
            if (error) {
                console.log(error)
            }
        });

        res.status(200).json({
            success: true,
            message: "File uploaded successfully"
        })
    } catch (error) {
        res.status(503).json({
            success: false,
            message: "Something went wrong!"
        })
    }
};

const isFileTypeSupported = (type, supportedTypes) => {
    return supportedTypes.includes(type);
};

const uploadFileToCloudinary = async (file, folder) => {
    const options = { folder }
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.imageUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;

        const file = req.files.imageFile;

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        // if file type is not supported
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported!"
            })
        }

        // file type is supported
        const response = await uploadFileToCloudinary(file, "Akshay");
        // console.log(response);

        // save entry in database
        await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url
        })

        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image uploaded successfully!"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong: " + error.message
        })
    }
} 