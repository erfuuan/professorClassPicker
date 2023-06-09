const router = require('express').Router()
const controller = require('./../controllers/index')


router.get("/class/:id", controller.user.getClass)
router.get("/class", controller.user.getAllClass)
router.get('/lesson', controller.user.getAllLesson)
router.put("/submitClass/:classId", controller.user.submitClass)
router.get("/profile", controller.user.getProfile)
router.put("/profile", controller.user.editProfile)

module.exports = router