const mongoose = require("mongoose");
const Hod = require("./hodSchema");

module.exports = {
    houseOfDream: async (req, res) => {
        try {

            let hodExist = await Hod.findOne(req.body.email);

            if(hodExist){
                res.send("You will be contacted soon")
            }else{
                await Hod.create(req.body)
                res.send("Thanks for Registering. You will be contacted soon")
            }
            
        } catch (error) {
            console.error(err);
            res.status(500).send('Something went wrong');
        }
    },
    
    testHod: async (req, res) => {
        try {
            res.send("testing");
        } catch (error) {
            console.error(err);
            res.status(500).send('Something went wrong');
        }
    },

}