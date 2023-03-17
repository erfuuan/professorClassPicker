const router = require("express").Router();

const auth = require("./auth.route")
const admin = require("./admin.route")
const user = require("./user.route")

router.use("/auth", auth)
router.use("/admin", admin)
router.use("/user", user)

module.exports = router