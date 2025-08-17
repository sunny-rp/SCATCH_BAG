const express = require("express")
const router = express.Router();
const ownerModel = require("../models/owner-model")
const bcrypt = require("bcrypt")


if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        try {
            let owner = await ownerModel.find();
            if (owner.length > 0) {
                return res
                    .status(403)
                    .send("You don't have permission to create owner");
            }

            let { fullname, email, password } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const createdOwner = await ownerModel.create({
                fullname,
                email,
                password: hash,
            });

            res.status(201).send(createdOwner);
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
        }
    });
}


router.get("/",(req,res)=>{
    res.send("hello bro!!!!!")
})


module.exports = router;