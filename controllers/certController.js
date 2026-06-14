const certModel = require("../models/certModel.js");

const addCert = async (req, res) => {
  try {
    await certModel.create(req.body);
    res.status(201).json({ c: "h" });
  } catch (e) {
    res.status(500).json({ c: "n" });
  }
};

const verify = async (req, res) => {
  try {
    const isD = await certModel.findOne({ id: req.params.id });
    if (!isD) {
      return res.status(404).json({ v: "n" });
    }
    res.status(200).json({ v: "h", data: isD });
  } catch (e) {
    res.status(500).json({ v: "n" });
  }
};

module.exports = {
  addCert,
  verify,
};