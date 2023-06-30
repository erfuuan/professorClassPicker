const router = require('express').Router()
const controller = require('./../controllers/index')

const Service = require('../service/index')
const resBuilder = require('../utils/responseBiulder')
var moment = require("jalali-moment");

router.get("/class/:id", controller.admin.class.getOne)
router.get("/class", controller.admin.class.getAll)
router.put("/class/:id", controller.admin.class.update)
router.post("/class", controller.admin.class.create)
router.delete("/class/:id", controller.admin.class.delete)
router.put('/class/unSubmit/Class',controller.admin.class.unSubmitClass)

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

router.post('/addAdmin', async (req, res) => {
    if (!req.body.email) { return resBuilder.badRequest(res, "ارسال ایمیل اجباری میباشد") }
    if (!req.body.mobile) { return resBuilder.badRequest(res, "ارسال شماره موبایل اجباری میباشد") }
    if (!req.body.password) { return resBuilder.badRequest(res, "ارسال پسورد اجباری میباشد") }
    try {
        req.body.password = Service.CRYPTOGRAPHY.md5(req.body.password),
            req.body.role = "admin"
        let newUser = await Service.CRUD.create("User", req.body)
        return resBuilder.created(res, newUser, " ادمین شما با موفقیت ایجاد شد.")
    } catch (err) {
        console.log(err)
        return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
    }
})


router.put('/editProfile', async (req, res) => {
     // const result = Schema.playListValidation.editSchema.validate(req.body)
            // if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
            try {
                const userExist = await Service.CRUD.findById('User', req.userId, [])
                if (!userExist) { return resBuilder.notFound(res, 'استاد یافت نشد') }
                // const data = await Joi.attempt(result.value, Schema.playListValidation.editSchema)
                req.body.password = req.body.password ? Service.CRYPTOGRAPHY.md5(req.body.password) : undefined
                const data = req.body
                const updatedClass = await Service.CRUD.updateById("User",
                    data,
                    req.userId,
                    [],
                    { softDelete: 0 })
                return resBuilder.success(res, updatedClass, ".استاد  شما با موفقیت ویرایش شد")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
})



module.exports = router