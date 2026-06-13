const userModel = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { useReducer } = require('react');

const getUsers = async (req, res) => {
    try {
        const ress = await userModel.find()
        res.send(ress)
    } catch(e) {
        console.log("Error in finding All members")
    }
}

const create = async (req, res) => {
    try {
        let {name, email, pass} = req.body;

        const isEmailPresent = await userModel.findOne({email : email})


        if(isEmailPresent) {
            console.log("Email Already Present")
            return res.json(
            
            {"c" : "n"}
        )
    }



        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(pass, salt)
        pass = hashPass
        const ress = await userModel.create({
            name,
            email,
            pass
        })
        console.log("User Created")
        res.status(200).json({
            "c" : "h"
        })
    } catch(e) {
        console.log("Error on Createing : ", e.message)
    }
}

const login = async (req, res) => {
    try {
        const {email, pass} = req.body;
        const tPass = await userModel.findOne({email : email})

        if(!tPass) return res.send("Error Mail not registerd")


        const isMatch = await bcrypt.compare(pass, tPass.pass);

        if(!isMatch) {
            console.log("Password Wrong err in login route")
            return res.send("PAssword Wrong")
        }

        const token = jwt.sign(
            {id : tPass._id},
            's'
        )

        console.log("Login Success")
        res.cookie("token", token)
        res.json(
            {"l" : "h"}
        )

    } catch(e) {
        console.log(e.message)
        res.json({"l" : "n"}
        )
    }
}


const checkUser = async (req, res) => {
    try {
        const isFound = await jwt.verify(req.cookies.token, 's')
        if(!isFound) return res.json(
            {
                "f" : "n"
            }
        )
            res.json({
                "f" : "h"
            })
    } catch(e) {
        res.send("Error 404")
    }
}

const getName = async (req, res) => {
    try {

        const data = await jwt.verify(req.cookies.token, 's')

        console.log("Data : ", data)

        if(!data) return res.send("404")


        const xID = data.id

        console.log("xID : ", xID)


        const nameK = await userModel.findOne({ _id : xID })

        console.log("nameK : ", nameK)

        if(!nameK) return res.send("404")

        res.json(
            {
                name : nameK.name
            }
        )
    } catch(e) {
        res.send("Internal Server Error")
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.send("Logout Success")
    } catch(e) {
        res.send("Error in Logout")
    }
}

module.exports = {
    getUsers,
    create,
    login,
    checkUser,
    getName,
    logout
}