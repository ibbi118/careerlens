const express = require('express');
const authRouter = express.Router()
const authControllers = require("../controllers/auth.controllers")
const authmiddleware = require("../middleware/auth.middleware")


authRouter.post("/register",authControllers.registerUser)
authRouter.post("/login",authControllers.loginUser)
authRouter.get("/getme",authmiddleware,authControllers.getMe)
authRouter.post("/logout",authmiddleware,authControllers.logoutUser)

module.exports = authRouter