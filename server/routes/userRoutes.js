const express = require("express")
const {protect} = require("../middlewares/protect")
const { createNewUser, getUsers,loginUser,getUserInfo } = require("../controllers/userControllers")
const router = express.Router()

router.post("/registre",createNewUser)
router.post("/login",loginUser)
router.get("/",getUsers)
router.get("/userdata",protect,getUserInfo)
module.exports = router