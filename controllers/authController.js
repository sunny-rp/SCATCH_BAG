const userModel = require("../models/user-models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken")


module.exports.registerUser = async function (req, res){
    try {
        let user = await userModel.findOne({email:req.body.email});
        if(user) return res.status(401).send("Email Already Exist");
        else{
            let { fullname, email, password } = req.body;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message)
                else {
                    let createdUser = await userModel.create({
                        fullname,
                        email,
                        password:hash,
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

module.exports.loginUser = async function (req,res){
    try {
        let {email,password} = req.body;

        let user = await userModel.findOne({email});
        if(!user) return res.status(404).send("Something Went Wrong")
        else{
             bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token = generateToken(user);
                    res.cookie("token",token)
                   return res.redirect("/shop");
                    res.status(200).send("Login Successfully.....!!!!!!!!!!")
                }
                else{
                    res.status(404).send("Somwthing went Wrong")
                }
             })
    
        }
    } catch (error) {
        res.status(500).send("Something Went Wrong")
    }
}


module.exports.logout = function (req,res) {
    res.cookie("token","");
    res.redirect("/")
}