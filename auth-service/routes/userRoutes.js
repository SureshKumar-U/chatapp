const express = require("express")
const { loginController, signUpController,getAllUsersController } = require("../controllers/userController")
const router = express.Router()

router.post("/login", loginController)
router.post("/signup", signUpController)
router.get("/", getAllUsersController)

module.exports = router