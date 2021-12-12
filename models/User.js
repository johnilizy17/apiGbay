const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    company:{
      type: String,
      default:""
    },
    name: {
      type: String,
      default:""
    },
    image: {
      type: String,
      default:""
    },
    number: {
      type: String,
      default: "",
    },
    number: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "",
    },
    country: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
