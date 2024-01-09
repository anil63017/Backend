const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: {
        type: String,
        unique: true,
    },
    image: String,
    phone: String,
    access: String,
    hash: String,
    salt: String,
});

module.exports = model('User', userSchema); 