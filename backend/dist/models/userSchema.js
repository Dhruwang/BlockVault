"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    pin: {
        type: Number,
    },
    address: {
        type: String,
    },
    isProfileCompleted: {
        type: Boolean,
        default: false
    }
});
const User = mongoose.model("User", userSchema);
exports.User = User;
