const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// Signup
authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    if (user) {
      res.status(403)
      return next(new Error("That username is already taken"))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      // payload,            // secret
      const token = jwt.sign(savedUser.withoutPass(), process.env.SECRET)
      return res.status(201).send({ token, user: savedUser.withoutPass() })
    })
  })
})

// Login
authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    if (!user) {
      res.status(403)
      return next(new Error("Username or Password are incorrect"))
    }
    user.checkPass(req.body.password, (err, isMatch) => {
      if (err) {
        res.status(403)
        return next(new Error('Username or Password are incorrect'))
      }
      if (!isMatch) {
        res.status(403)
        return next(new Error('Username or Password are incorrect'))
      }
      const token = jwt.sign(user.withoutPass(), process.env.SECRET)
      return res.status(200).send({ token, user: user.withoutPass() })
    })
  })
})

module.exports = authRouter
