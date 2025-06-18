const mongoose = require("mongoose");
const Hod = require("./hodSchema");

module.exports = {
    houseOfDream: async (req, res) => {
        try {
            let insertData = {
                name : req.body.fullName,
                email : req.body.email,
                phone : req.body.phone,
                message : req.body.message || ""
            }

            let hodExist = await Hod.findOne({email:req.body.email});

            if(hodExist){
                res.status(200).send("You will be contacted soon")
            }else{
                await Hod.create(insertData)
                res.status(201).send("Thanks for Registering. You will be contacted soon")
            }
            
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

}