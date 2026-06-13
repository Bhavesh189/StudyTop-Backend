const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const ress = await userModel.find();
    res.status(200).json(ress);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    let { name, email, pass } = req.body;

    const isEmailPresent = await userModel.findOne({ email: email });

    if (isEmailPresent) {
      return res.status(409).json({ c: "n" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(pass, salt);
    pass = hashPass;

    const ress = await userModel.create({
      name,
      email,
      pass,
    });

    res.status(201).json({ c: "h" });
  } catch (e) {
    res.status(500).json({ c: "n" });
  }
};

const login = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const tPass = await userModel.findOne({ email: email });

    if (!tPass) {
      return res.status(404).json({ l: "n" });
    }

    const isMatch = await bcrypt.compare(pass, tPass.pass);

    if (!isMatch) {
      return res.status(401).json({ l: "n" });
    }

    const token = jwt.sign({ id: tPass._id }, "s");

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ l: "h" });
  } catch (e) {
    res.status(500).json({ l: "n" });
  }
};

const checkUser = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ f: "n" });
    }

    const isFound = await jwt.verify(req.cookies.token, "s");

    if (!isFound) {
      return res.status(401).json({ f: "n" });
    }

    res.status(200).json({ f: "h" });
  } catch (e) {
    res.status(500).json({ f: "n" });
  }
};

const getName = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const data = await jwt.verify(req.cookies.token, "s");

    if (!data) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const xID = data.id;
    const nameK = await userModel.findOne({ _id: xID });

    if (!nameK) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ name: nameK.name });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Success" });
  } catch (e) {
    res.status(500).json({ error: "Error in Logout" });
  }
};

module.exports = {
  getUsers,
  create,
  login,
  checkUser,
  getName,
  logout,
};
