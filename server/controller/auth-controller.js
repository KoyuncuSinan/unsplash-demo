import mongoose from "mongoose"
import User from "../model/User-model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async (req,res) => {
    try{
        const {
            username,
            email,
            password
        } = req.body;

        const existingEmail = await User.findOne({email:email}).exec();
        const existingUsername = await User.findOne({username: username}).exec();

        if(existingEmail){
            return res.status(409).json({msg: "Email already exist."})
        }else if(existingUsername){
            return res.status(409).json({msg: "Username already exist."});
        }else if(password.length > 20 || password.length < 5){
            return res.status(409).json({msg: "Password should be between 5-20 characters."})
        }else if(!email.includes("@")){
            return res.status(409).json({msg:"Email should be in correct format."})
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}


export const login = async (req,res) => {
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username:username});
        if(!user){
            return res.status(400).json({msg: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid credentials"});
        }
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
        const userWithoutPassword = {
            username: user.username,
            email: user.email,
            _id: user._id
        };
        res.status(200).json({token,user: userWithoutPassword});
    } catch(err){
        res.status(500).json({error: err.message});
    }
};