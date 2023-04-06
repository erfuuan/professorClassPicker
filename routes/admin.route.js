const router = require('express').Router()
const controller = require('./../controllers/index')

router.get("/class/:id", controller.admin.class.getOne)
router.get("/class", controller.admin.class.getAll)
router.put("/class/:id", controller.admin.class.update)
router.post("/class", controller.admin.class.create)
router.delete("/class/:id", controller.admin.class.delete)

router.get("/lesson/:id", controller.admin.lesson.getOne)
router.get("/lesson", controller.admin.lesson.getAll)
router.put("/lesson/:id", controller.admin.lesson.update)
router.post("/lesson", controller.admin.lesson.create)
router.delete("/lesson/:id", controller.admin.lesson.delete)

router.get("/user/:id", controller.admin.user.getOne)
router.get("/user", controller.admin.user.getAll)
router.put("/user/:id", controller.admin.user.update)
router.post("/user", controller.admin.user.create)
router.delete("/user/:id", controller.admin.user.delete)



module.exports = router