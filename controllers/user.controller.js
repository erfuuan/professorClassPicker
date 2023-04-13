const Service = require('../service/index')
const resBuilder = require('../utils/responseBiulder')
const moment = require('moment-jalali')

module.exports = {
    // bind: async (req, res) => { },
    getClass: async (req, res) => {
        try {
            let classData = {}
            classData = await Service.CRUD.findById('Class', req.params.id, [])
            if (!classData || classData.softDelete) { return resBuilder.notFound(res, "این کلاس حدف شده است") }
            delete classData.softDelete
            delete classData.createdAt
            delete classData.updatedAt
            classData.registerDate = moment(classData.registerDate, 'X').format('jYYYY/jMM/jDD')
            return resBuilder.success(res, classData, "")
        } catch (error) {
            console.log("error for find a post === > ", error)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    },

    getAllClass: async (req, res) => {
        try {
            let classes = {}
            classes = await Service.CRUD.getAll('Class',
                { softDelete: false }, "", { 'createdAt': -1 }, { softDelete: 0, createdAt: 0, updatedAt: 0 })
            if (classes.length == 0) { return resBuilder.success(res, [], '') }
            classes.forEach(element => {
                element.registerDate = moment(element.registerDate, 'X').format('jYYYY/jMM/jDD')
            })
            return resBuilder.success(res, classes, "")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    },
    getAllLesson: async (req, res) => {
        try {
            let lessons = {}
            lessons = await Service.CRUD.getAll('Lesson',
                { softDelete: false }, "", { 'createdAt': -1 }, { softDelete: 0, createdAt: 0, updatedAt: 0 })
            if (lessons.length == 0) { return resBuilder.success(res, [], '') }
            lessons.forEach(element => {
                element.registerDate = moment(element.registerDate, 'X').format('jYYYY/jMM/jDD')
            })
            return resBuilder.success(res, lessons, "")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    },

    // submitClass: async (req, res) => { },
    getProfile: async (req, res) => {
        try {
            // const playlistData = await Service.CRUD.findById('PlayList', req.params.id, ['fileIds', 'authorId', 'tagIds', 'categoryIds'])
            const userData = await Service.CRUD.findById('User', req.userId, [])
            if (!userData || userData.softDelete) { return resBuilder.notFound(res, "خطا کاربر وجود ندارد") }
            delete userData.softDelete
            delete userData.createdAt
            delete userData.updatedAt
            delete userData.password
            userData.registerDate = moment(userData.registerDate, 'X').format('jYYYY/jMM/jDD')
            return resBuilder.success(res, userData, "")
        } catch (error) {
            console.log("error for find a post === > ", error)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }

    },
    editProfile: async (req, res) => {
        // const result = Schema.playListValidation.editSchema.validate(req.body)
        // if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
        try {
            const userExist = await Service.CRUD.findById('User', req.userId, [])
            if (!userExist) { return resBuilder.notFound(res, "خطا کاربر وجود ندارد") }
            // const data = await Joi.attempt(result.value, Schema.playListValidation.editSchema)
            const data = req.body
            const updatedUser = await Service.CRUD.updateById("User",
                data,
                req.userId,
                [],
                { softDelete: 0 })
            return resBuilder.success(res, updatedUser, ".اطلاعات شما با موفقیت ویرایش شد")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

        }
    }


}