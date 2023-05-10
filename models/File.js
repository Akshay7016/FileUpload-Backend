const mongoose = require("mongoose");

const sendMailToUser = require("../utils/sendMailToUser");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    }

});

// Post middleware - will run after saving entry in database
fileSchema.post("save", async (doc) => {
    try {
        await sendMailToUser(doc.email, doc.name, doc.fileUrl);
    } catch (error) {
        console.log("Something went wrong while sending mail: ", error.message);
    }
});

module.exports = mongoose.model("File", fileSchema);