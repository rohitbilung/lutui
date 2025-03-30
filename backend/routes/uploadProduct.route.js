const express = require('express');
const router = express.Router();
const multer = require("multer");
const cloudinary = require('cloudinary').v2
const fs = require('fs')
require('dotenv').config();

const upload = multer({ dest: "uploads/" }).array("image", 5);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/product-upload', upload, async (req, res) => {
    const files = req.files;
    const urls = [];

    try {
        // Use Promise.all to handle multiple asynchronous uploads
        await Promise.all(
            files.map(file => 
                new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(file.path, { folder: "lutui" }, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log("File uploaded successfully:", result);
                            urls.push(result.url);

                            // Delete the temporary file after upload
                            fs.unlink(file.path, (err) => {
                                if (err) {
                                    console.error("Error deleting temp file:", err);
                                } else {
                                    console.log("Temp file deleted.");
                                }
                            });

                            resolve(); // Resolve the promise when upload is done
                        }
                    });
                })
            )
        );

        // Once all uploads are complete, send the response
        res.send({
            urls: urls,
            message: "Files uploaded successfully"
        });

    } catch (err) {
        console.error("Error during file upload process:", err);
        res.status(500).send({
            message: "Error uploading files",
            error: err
        });
    }
});

module.exports = router;