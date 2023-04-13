const router = require("express").Router();
const functions = require("../utils/functions")

const auth = require("./auth.route")
const admin = require("./admin.route")
const user = require("./user.route")

router.use("/auth", auth)
router.use("/admin", functions.authentication, functions.checkUserExist, functions.checkAdminRole, admin)
router.use("/user", functions.authentication, functions.checkUserExist, functions.checkUserRole, user)

module.exports = router