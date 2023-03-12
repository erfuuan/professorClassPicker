const router = require('express').Router()
const controller = require('./../controllers/index')

router.post("/signup", controller.auth.Signup)
router.post("/login", controller.auth.Login)
router.post("/entrance", controller.auth.Entrance)
router.post("/resetPassword", controller.auth.ResetPassword)
router.post("/sendActivationCode", controller.auth.sendActivationCode);
module.exports = router