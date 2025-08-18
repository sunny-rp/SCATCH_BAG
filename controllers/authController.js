const userModel = require("../models/user-models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken")


module.exports.registerUser = async function (req, res){
    try {
        let user = await userModel.findOne({email:req.body.email});
        if(user) return res.send("Email Already Exist");
        else{
            let { fullname, email, password } = req.body;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message)
                else {
                    let createdUser = await userModel.create({
                        fullname,
                        email,
                        password,
                    })

                    let token = generateToken(createdUser);
                    res.cookie("token",token)
                    res.status(201).send("user Created Successfully....!!!!!!!!")

                }
            })
        })
        }
        
    } catch (error) {
        res.send(error.message);

    }
}
