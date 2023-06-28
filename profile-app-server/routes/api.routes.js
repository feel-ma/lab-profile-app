const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const fileUploader = require("../config/cloudinary.config");

router.put("/users/", (req, res, next) =>{
    const { id } = req.query;
    const {imageUrl}= req.body

    User.findByIdAndUpdate(id, {imageUrl}) .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
      });

})

router.get("/users/", (req, res, next) =>{
    const { id } = req.query;
  // const {_id}=req.body
   
   User.findById(id).then((data)=>{
   
    res.json(data)
   })
})


router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) =>{
    const {image}= req.body

    if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
      }

      res.json({ imgUrl: req.file.path });

})





module.exports = router;