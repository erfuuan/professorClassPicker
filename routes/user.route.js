const router = require('express').Router()
const controller = require('./../controllers/index')


router.get("/class/:id", controller.user.getClass)
router.get("/class", controller.user.getAllClass)
router.get("/submitClass", controller.user.submitClass)
router.get("/", controller.user.getProfile)
router.put("/", controller.user.editProfile)

module.exports = router