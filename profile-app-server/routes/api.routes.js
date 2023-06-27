const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const fileUploader = require("../config/cloudinary.config");

router.put("/users", (res,req,next) =>{
    const {image}= req.body


})

router.get("/users", (res,req,next) =>{
    

})


router.post("/upload", fileUploader.single("imageUrl"), (res,req,next) =>{
    const {image}= req.body

    if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
      }

      res.json({ imgUrl: req.file.path });

})





module.exports = router;