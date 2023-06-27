const { Schema, model } = require("mongoose");


const campusOptions = [
  "Madrid",
  "Barcelona",
  "Miami",
  "Paris",
  "Berlin",
  "Amsterdam",
  "México",
  "Sao Paulo",
  "Lisbon",
  "Remote",
];



const courseOptions = [
  "Web Dev",
  "UX/UI",
  "Data Analytics",
  "Cyber Security",
];


// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    campus: {
      type: String,
     enum: campusOptions,
      required: true
    },
    course: {
      type: String,
      enum: courseOptions,
      required: true
    },
    image: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
