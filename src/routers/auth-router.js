const express = require("express")
const { register, login, getMe } = require("../controllers/auth-controller")
const { authenticate } = require("../middlewares/authentication")
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/getme",authenticate,getMe)

module.exports = router;