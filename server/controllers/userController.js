const { compare } = require("bcrypt");
// const express = require("express")
const user = require("../models/userModel");
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
const register = (req, res) => {
    console.log(req.body);
    const { firstname, lastname, email, password } = req.body
    user.create({ firstname, lastname, email, password }, (err, result) => {
        if (err) {
            console.log(err)
            res.send({ status: false, message: "Err occured" })
        } else {
            res.json({
                success: true,
                message: "User registration successful",
                result
            })
        }
    })
}

const login = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    console.log({ email, password });
    user.findOne({ email }).select("+password").exec(async (err, data) => {
        console.log(data);
        if (err) {
            res.status(500).json(
                {
                    success: false,
                    message: err
                }
            )
        } else {
            if (data) {
                console.log(data);
                try {
                    const ValidPassword = await compare(password, data.password);
                    console.log(data);
                    if (ValidPassword) {
                        const token = jwt.sign({ email }, "secret", { expiresIn: 60 })
                        console.log(token);
                        data.password = "",
                            res.json({
                                token,
                                success: true,
                                message: "Login successful",
                                data,
                            })
                    }
                    else {
                        res.status(400).json({
                            success: false,
                            message: "Email doesn't match",

                        })
                    }
                } catch (error) {
                    res.send(error)
                    console.log(error);
                }
            } else {
                res.send({ message: "Email does not match any details", status: false })
            }
        }
    })
}


const dashboard = (req, res) => {
    user.find((error, result) => {
        if (error) {
            res.status(500).json({ success: false, message: "An error occur" })
            console.log("Error ti wa");
        } else {
            res.json({
                success: true,
                data: result,
                message: "it's successfull"
            })
        }
    })
}


const getUser = (req, res) => {
    user.findById(req.user.email, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "An error occured when fetching user profile",
            })
        } else {
            res.json({
                success: true,
                data,
                message: "User Profile fetched"
            })
        }
    })
}

module.exports = { register, login, getUser, dashboard }
