const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { name,email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await new User({
      name,
      email,
      password: passwordHash,
    }).save();
    res.json({ message: "User added successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authRouter.post("/login",async (req,res) => {
    try{
        const {email,password} = req.body
        const user = await User.findOne({email : email})
        if(!user){
            throw new Error("Invalid credentials!");
        }
        const verified = await bcrypt.compare(password,user.password)
        if(!verified){
            throw new Error("Invalid credentials!");
        }
        const token = await jwt.sign({_id : user._id},'wkhgfiyst6yei2043uJHC,xzmMFEQHTeg',{expiresIn : '1d'})
        res.cookie('token',token,{ expires: new Date(Date.now() + 24 * 60 * 60 * 1000)})
        res.status(200).json({message : 'User logged in successfully'})

    }catch(err){
        res.status(400).json({message : err.message})
    }
})

module.exports = authRouter;
