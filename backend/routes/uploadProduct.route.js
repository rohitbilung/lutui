const express = require('express');
const router = express.Router();
const multer = require("multer");
const cloudinary = require('cloudinary').v2
const fs = require('fs')
require('dotenv').config();
const {isLoggedIn, isAdmin} = require('../middlewares/check')

const upload = multer({
    dest: "uploads/",
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpg|jpeg|png/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(file.originalname.split('.').pop().toLowerCase());

        if (mimeType && extName) {
            return cb(null, true);  // File is valid, continue uploading
        } else {
            return cb(new Error('Only jpg, jpeg, and png images are allowed'), false);  // Invalid file type
        }
    },
}).array("image", 5); // Limits to 5 images

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/product-upload',isAdmin, upload, async (req, res) => {
    const files = req.files;
    const urls = [];
    if (files.length > 5) {
        return res.status(400).send({
            message: "Cannot upload more than 5 images."
        });
    }
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