const router = require('express').Router()


router.get("/class/:id", controller)
router.get("/class", controller)
router.put("/class", controller)
router.post("/class", controller)
router.delete("/class", controller)


router.get("/user/:id", controller)
router.get("/user", controller)
router.put("/user", controller)
router.post("/user", controller)
router.delete("/user", controller)


module.exports = router