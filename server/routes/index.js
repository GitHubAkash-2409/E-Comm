const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/userSignUp")
const userSignInController = require('../controller/userSignIn')
const userDetailsController = require('../controller/userDetails')
const authToken = require('../middleware/authToken')
const userLogoutController = require('../controller/userLogout')
const allUsersController = require('../controller/allUsers')
const updateUserController = require('../controller/updateUser')

router.post("/signup", userSignUpController)

router.post("/login", userSignInController)

router.get("/user-details", authToken, userDetailsController)

router.get("/userLogout", userLogoutController)

// admin panel //

router.get("/all-users", authToken, allUsersController)

router.post("/update-user", authToken, updateUserController)


module.exports = router