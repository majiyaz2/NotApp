const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: {unique: true}
        },
        email: {
            type: String,
            required: true,
            index: {unique: true}
        },
        password: {
            type: String,
            require: true
        },
        avatar: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const User =  mongoose.model('User', userSchema);
module.exports = User;