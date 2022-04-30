const req = require("express/lib/request");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JwtSecrate = "Hello World";
const db = require("../utils/db");
const Registration = require("../model/registration");
const Note = require("../model/notes");

exports.postregistration = async (req, res, next) => {
  try {
    const { name, password, email,dob,classofthestudent,roll } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const registration = new Registration({
      name,
      password: hashpassword,
      email,
      dob,
      classofthestudent,
      roll
    });
    const data = {
      user: {
        email: req.body.email,
      },
    };
    const authtoken = jwt.sign(data, JwtSecrate);

    const newuser = await registration.save();
    res.json({"msg":"student add",authtoken})
    console.log(newuser);
  } catch (error) {
    console.log(error);
  }
};
exports.getuser = async (req, res) => {
  try {
    useremail = req.user.email;
    const user = await Registration.findOne({ email: useremail }).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
exports.postnotes = async (req, res, next) => {
  try {
    const { document, subject } = req.body;
    const notes = new Note({
      email: req.user.email,
      document,
      subject,
    });
    const storeNotes = await notes.save();
    res.json({"Msg":"Documentadd",storeNotes});
  } catch (error) {
    console.log(error);
  }
};
exports.fetchall = async (req, res, next) => {
  try {
    const notes = await Note.find({ email: req.user.email });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
exports.updatenote = async (req, res, next) => {
  try {
    const { document, subject } = req.body;
    const newNote = {};
    if (document) {
      newNote.document = document;
    }
    if (subject) {
      newNote.subject = subject;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.json("Note Not Exist");
    }
    let user = await Registration.findOne({ email: req.user.email });
    if (!user) {
      return res.json("Auth error");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({"Msg":"Note Updated", note });
  } catch (error) {
    console.log(error);
  }
};
exports.deletenote = async (req, res, next) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.json("Note Not Exist");
    }
    let user = await Registration.findOne({ email: req.user.email });
    if (!user) {
      return res.json("Auth error");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "Note delete", note });
  } catch (error) {
    console.log(error);
  }
};
