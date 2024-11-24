import express from "express";
import User from "./Users.js"
import jwt from "jsonwebtoken"
import config from "../../utils/config/config.js";
import bcrypt from "bcryptjs"


export async function GetAllUsers(req , res){
    if (req.role === 'admin') {

        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;

        const total = await User.countDocuments();

        const totalPages = Math.ceil(total / limit);

        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({ data: users, total, totalPages });
    } else {
        return res.status(403).send({ msg: 'Forbidden: Only admin can access this route' });
    }
}

export async function GetUserId(req , res){
    try {
        const id = req.userId;
        res.status(200).send(id)
    } catch (error) {
        return res.status(500).send('Error: ' + error.message);
    }
}

export async function GetUserToken(req , res){
    try {
        const id = req.userId;
        const data = await User.findById(id)
        await data.save()

        res.status(200).send({data})
    } catch (error) {
        return res.status(500).send('Error: ' + error.message);
    }
}

export async function GetUserById(req , res){
    try {
        const user = req.params.userId
        const data = await User.findById({_id : user})
        res.status(200).json({data : data})
    } catch (error) {
        return res.status(500).send('Error: ' + error.message);
    }
}


export async function Register(req , res){
    try {
        req.body.password = await bcrypt.hash(req.body.password, 12);
        const userExist = await User.findOne({ username: req.body?.username });
        if (userExist) {
            return res.status(400).send({ msg: 'Username already exists' });
        }
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        });
        res.status(201).json({ data: user, token });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}

export async function Login(req , res){
    try {
        const {email , password} = req.body || {};
        const user = await User.findOne({email : email})
        // decode part :
        const decode = await bcrypt.compare(password , user.password);
        if (!user || !decode) {
            return res.status(401).send({ msg: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        });

        res.json({ data: user, token });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);     
    }
}

export async function DeleteUser(req , res){
    try {
        if (!req.query.id) {
            return res.status(400).send({ msg: 'User ID is required to delete' });
        }

        if (req.role !== "admin") {
            return res.status(403).send({ msg: 'Forbidden: Only admin can access this route' });
        }

        const data = await User.findOneAndDelete({ _id: req.query.id });
        if (!data) {
            return res.status(404).send({ msg: "User not found" });
        }

        return res.status(200).send({ msg: "User has been deleted" });

    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
}

export async function PatchUser(req , res){
    try {
        const userId = req.userId; 
        const updates = req.body; 

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser); 
    } catch (error) {
        return res.status(400).json({ message: error.message }); 
    }
}