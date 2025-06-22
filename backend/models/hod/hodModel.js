const mongoose = require("mongoose");
const Hod = require("./hodSchema");
const { sendAdminEmail, sendEmailUser } = require("../../utils/email-service/nodeMailder");
const {
    userSubject,
    userText,
    userHtml,
    adminSubject,
    adminText,
    adminHtml
} = require("../../utils/email-service/email-template.js");

module.exports = {
    houseOfDream: async (req, res) => {
        try {
            const { fullName, email, phone } = req.body;
            const contactNumber = process.env.CONTACT_NUMBER || '+91-XXXXXXXXXX';
            const companyName = 'House of Dreams Realty';

            let hodExist = await Hod.findOne({ email });
            if (hodExist) {
                return res.status(200).send("You have already registered with us. We will contact you soon.");
            }

            await Hod.create({ name: fullName, email, phone });

            // Prepare admin email content
            const adminMail = {
                to: process.env.ADMIN_EMAIL,
                subject: adminSubject.replace('[Your Company Name]', companyName),
                text: adminText
                    .replace('[User Name]', fullName)
                    .replace('[User Email]', email)
                    .replace('[User Phone]', phone)
                    .replace('[Your Company Name]', companyName),
                html: adminHtml
                    .replace('[User Name]', fullName)
                    .replace('[User Email]', email)
                    .replace('[User Phone]', phone)
                    .replace('[Your Company Name]', companyName)
            };

            // Prepare user email content
            const userMail = {
                to: email,
                subject: userSubject.replace('[Your Company Name]', companyName),
                text: userText
                    .replace('[Your Company Name]', companyName)
                    .replace('[Your Contact Number]', contactNumber),
                html: userHtml
                    .replace('[Your Company Name]', companyName)
                    .replace('[Your Contact Number]', contactNumber)
            };

            // Send both emails in parallel
            await Promise.all([
                sendAdminEmail(adminMail),
                sendEmailUser(userMail)
            ]);

            res.status(201).send("Thank you for registering with us. We will contact you soon.");
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong');
        }
    },

    testHod: async (req, res) => {
        try {
            res.status(200).send("testing");
        } catch (error) {
            console.error(err);
            res.status(500).send('Something went wrong');
        }
    },

    deleteHod: async (req, res) => {
        try {
            // delete the document with the specified ID
            let id = req.params.id;
            let deleteData = await Hod.findByIdAndDelete(id);
            if (!deleteData) {
                return res.status(404).send('Document not found');
            }
            res.status(200).send('Document deleted successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong');
        }
    },

    // get by id
    getHodById: async (req, res) => {
        try {
            let id = req.params.id;
            let hodData = await Hod.findById(id);
            if (!hodData) {
                return res.status(404).send('Document not found');
            }
            res.status(200).json(hodData);
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong');
        }
    },

    // get all hods
    getAllHod: async (req, res) => {
        try {
            let allHod = await Hod.find({});
            if (!allHod || allHod.length === 0) {
                return res.status(404).send('No documents found');
            }
            res.status(200).json(allHod);
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong');
        }
    },

    // update hod by id
    updateHodById: async (req, res) => {
        try {
            let id = req.params.id;
            let updateData = {
                name: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message || ""
            }
            let updatedHod = await Hod.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedHod) {
                return res.status(404).send('Document not found');
            }
            res.status(200).json(updatedHod);
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong');
        }
    },
}