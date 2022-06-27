import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user";
import config from "../config";

const signUp = async (req, res) => {

    try{
        const { username, email, password } = req.body;

        //checks if the username or email are already registered
        const userFound = await User.findOne({username});
        if(userFound){
            return res.status(400).json({message: "The username is alredy in use"});
        };
        const emailFound = await User.findOne({email});
        if(emailFound){
            return res.status(400).json({message: "The email is alredy in use"});
        };

        //encrypts password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //creates the new user
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });

        //save the new user in mongoDB
        const savedUser = await newUser.save();

        //creates a token
        const token = jwt.sign(
            {id: savedUser._id},
            config.SECRET,
            {expiresIn: 86400} //24 hs
        );

        return res.status(200).json({token});

    }catch(error){
        console.log(error);
        return res.status(500).json({error});
    }

};

const signIn = async (req, res) => {

    try{
        const {username, password} = req.body;

        //checks user data
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "Incorrect user or password"});
        };

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message: "Incorrect user or password"});
        }

        //creates a token
        const token = jwt.sign(
            {id: user._id},
            config.SECRET,
            {expiresIn: 86400} //24 hs
        );

        return res.status(200).json({token});

    }catch(error){
        console.log(error);
        return res.status(500).json({error});
    }

};


export { signUp, signIn };