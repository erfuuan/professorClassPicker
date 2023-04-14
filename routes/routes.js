const router = require("express").Router();
const functions = require("../utils/functions")
const resBuilder = require('../utils/responseBiulder')
const moment = require('moment-jalali')

const auth = require("./auth.route")
const admin = require("./admin.route")
const user = require("./user.route")

router.use("/auth", auth)
router.use("/admin", functions.authentication, functions.checkUserExist, functions.checkAdminRole, admin)
router.use("/user", functions.authentication, functions.checkUserExist, functions.checkUserRole, user)

router.get("/check-token", functions.authentication, functions.checkUserExist, (req, res) => {
    req.userData.registerDate = moment(req.userData.registerDate, 'X').format('jYYYY/jMM/jDD')
    return resBuilder.success(res, req.userData, "")
})

module.exports = router