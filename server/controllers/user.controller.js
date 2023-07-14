const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secret = process.env.JWT_KEY;

module.exports.findUserById = (req, res) => {
    User.findById(req.userId)
        .then(oneUser => {
            const { password, ...userInfo } = oneUser._doc;
            res.json({ user: userInfo });
        })
        .catch(err => res.json({ message: "Something went wrong retrieving user information.", error: err }));
}

module.exports.findUserByName = (req, res) => {
    User.findOne({ username: req.params.username })
        .then(oneUser => {
            const { password, ...userInfo } = oneUser._doc;
            res.json({ user: userInfo });
        })
        .catch(err => res.json({ message: "Something went wrong retrieving user information.", error: err }));
}

module.exports.findAllUsers = (req, res) => {
    User.find()
        .then(allUsers => res.json({ users: allUsers }))
        .catch(err => res.json({ message: "Something went wrong retrieving all users.", error: err }));
}

module.exports.createUser = (req, res) => { // add functionality to check for existing users
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, secret);
            const { password, ...userInfo } = user._doc
            res
                .cookie("usertoken", userToken, {
                    httpOnly: true
                })
                .json({ message: "Login success!", user: userInfo });
        })
        .catch(err => res.status(400).json(err));
}

module.exports.loginUser = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        return res.status(400).send("The specified email could not be found.");
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword) {
        return res.status(400).send("The password you entered is incorrect.");
    }

    const userToken = jwt.sign({
        id: user._id
    }, secret);

    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ message: "Login success!" });
}

module.exports.logout = (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
}

module.exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.userId, req.body, { new: true, runValidators: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json({ message: "Something went wrong updating user information.", error: err }));
}

module.exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.userId)
        .then(result => res.json(result))
        .catch(err => res.json({ message: "Something went wrong deleting the user.", error: err }));
}