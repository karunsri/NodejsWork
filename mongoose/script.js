import mongoose from "mongoose";
import User from "./User.js";

// const mongoose = require("mongoose");

// const User = require("./User")

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.on("open", () => {
    console.log("Connection successful");
});

db.on("error", () => {
    console.log("Connection failed");
});

const newUser = new User({
    name : "Karuna",
    age : 27,
    isAdult : true,
    hobbies : ["Teaching", "Learning"],

});

newUser.save().then((data) => {
    console.log(data);
});

const user2 = await User.create({
    name : "Varuna",
    age : 17,
    isAdult : false,
    hobbies : ["Dancing", "Teaching"],
});
 
user2.save().then((data) => {
    console.log(data);
});

const users = await User.find();
console.log(users);


const particularUser = await User.findOne({ name: "Varuna"});
console.log("User name Varuna", particularUser);

const user3 = await User.create({
    name : "Prerna",
    age : 31,
    isAdult : true,
    hobbies : ["Cooking", "Teaching"],
})

user3.name = "Chandni";

const youngUser = await user3.save();

console.log(youngUser);

const deletedUser = await User.deleteOne({ name : "Karuna"});

const deleteAllUsers = await User.deleteMany({ name : "Karuna"});

console.log(deleteAllUsers);