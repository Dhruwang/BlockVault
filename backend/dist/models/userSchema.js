"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    pin: {
        type: Number,
    },
    address: {
        type: String,
        unique: true,
    },
    isProfileCompleted: {
        type: Boolean,
        default: false
    },
    transfers: {
        type: [String]
    }
});
const User = mongoose.model("User", userSchema);
exports.User = User;
