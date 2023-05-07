const File = require("../models/File");

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