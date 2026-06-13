const courseModel = require('../models/courseModel');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const addCourse = async (req, res) => {
    try {
        const data = await jwt.verify(req.cookies.token, 's');

        if (!data) return res.status(401).json({ "a": "n" });

        const x = await userModel.findOne({ _id: data.id });
        const email = x.email;

        if (email !== "bs@bs.com") return res.status(403).json({ "a": "n" });

        const parsedLinks = JSON.parse(req.body.link);
        const ress = await courseModel.create({
            name: req.body.name,
            id: req.body.id,
            nLecture: req.body.nLecture,
            link: parsedLinks,
            image: req.file.path
        });

        res.status(201).json({ "a": "h" });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ "a": "n" });
    }
};

const getCourse = async (req, res) => {
    try {
        const ress = await courseModel.find();
        res.status(200).json(ress);
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Error");
    }
};

const d = async (req, res) => {
    try {
        // const data = await jwt.verify(req.cookies.token, 's');

        // if (!data) return res.status(401).json({ "a": "n" });

        // const x = await userModel.findOne({ _id: data.id });
        // const email = x.email;

        // if (email !== "bs@bs.com") return res.status(403).json({ "a": "n" });

        await courseModel.deleteOne({ name: req.params.name });
        res.status(200).send("Deleted");
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Didnt deleted");
    }
};

const appendCourseLinks = async (req, res) => {
    try {
        const data = await jwt.verify(req.cookies.token, 's');

        if (!data) return res.status(401).json({ "a": "n" });

        const x = await userModel.findOne({ _id: data.id });
        const email = x.email;

        if (email !== "bs@bs.com") return res.status(403).json({ "a": "n" });

        const { id, newLinks } = req.body;

        await courseModel.findOneAndUpdate(
            { id: id },
            {
                $push: { link: { $each: newLinks } },
                $inc: { nLecture: newLinks.length }
            }
        );

        res.status(200).json({ "a": "h" });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ "a": "n" });
    }
};

module.exports = {
    addCourse,
    getCourse,
    d,
    appendCourseLinks
};