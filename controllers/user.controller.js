const Service = require('../service/index')
const resBuilder = require('../utils/responseBiulder')
const moment = require('moment-jalali')

module.exports = {
    // bind: async (req, res) => { },
    getClass: async (req, res) => {
        try {
            let classData = {}
            classData = await Service.CRUD.findById('Class', req.params.id, ['teacherId'])
            if (!classData || classData.softDelete) { return resBuilder.notFound(res, "این کلاس حدف شده است") }
            delete classData.softDelete
            delete classData.createdAt
            delete classData.updatedAt
            classData.registerDate = moment(classData.registerDate, 'X').format('jYYYY/jMM/jDD')
            classData.startTime = moment(classData.startTime, 'X').format('HH:mm')
            classData.endTime = moment(classData.endTime, 'X').format('HH:mm')
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
                { softDelete: false }, ['teacherId'], { 'createdAt': -1 }, { softDelete: 0, createdAt: 0, updatedAt: 0 })
            if (classes.length == 0) { return resBuilder.success(res, [], '') }
            classes.forEach(element => {
                element.registerDate = moment(element.registerDate, 'X').format('jYYYY/jMM/jDD')
                element.startTime = moment(element.startTime, 'X').format('HH:mm')
                element.endTime = moment(element.endTime, 'X').format('HH:mm')
            })
            return resBuilder.success(res, classes, "")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    },

    getAllMyClass: async (req, res) => {
        try {
            let classes = {}
            classes = await Service.CRUD.getAll('Class',
                { softDelete: false, teacherId: req.userId }, ['teacherId'], { 'createdAt': -1 }, { softDelete: 0, createdAt: 0, updatedAt: 0 })
            if (classes.length == 0) { return resBuilder.success(res, [], '') }
            classes.forEach(element => {
                element.registerDate = moment(element.registerDate, 'X').format('jYYYY/jMM/jDD')
                element.startTime = moment(element.startTime, 'X').format('HH:mm')
                element.endTime = moment(element.endTime, 'X').format('HH:mm')
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
            const lessonCom = lessons.map(lesson => { return { ...lesson, show: `${lesson.title}(${lesson.description})` } })
            return resBuilder.success(res, lessonCom, "")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    },

    submitClass: async (req, res) => {
        const classExist = await Service.CRUD.findById('Class', req.params.classId, "")
        if (!classExist) { return resBuilder.notFound(res, "کلاسی با این شناسه یافت نشد") }
        if (classExist.status == 'reserved') {
            return resBuilder.conflict(res, "", 'این کلاس قبلا تخصیص داده شده است')
        }
        let checkClassTimeConflict = await Service.CRUD.find('Class', { teacherId: req.userId }, [], "", "")
        checkClassTimeConflict = checkClassTimeConflict.filter(a => a._id != req.params.classId)
        if (checkClassTimeConflict[0] && checkClassTimeConflict[0]._id != req.params.classId) {
            if (checkClassTimeConflict[0].day == classExist.day) {
                console.log("class in One Day")
                // const timeMiangin = classExist.startTime + classExist.endTime / 2
                // if (checkClassTimeConflict[0].startTime < timeMiangin && classExist.startTime < checkClassTimeConflict[0].startTime) {
                //     return resBuilder.conflict(res, "این کلاس با زمان کلاس هایی ک برداشتید همزمان است")
                // }

                const bigStartDate = classExist.startTime > checkClassTimeConflict[0].startTime ? classExist.startTime : checkClassTimeConflict[0].startTime
                const smallStartDate = classExist.startTime < checkClassTimeConflict[0].startTime ? classExist.startTime : checkClassTimeConflict[0].startTime
                const smallEndDate = classExist.endTime < checkClassTimeConflict[0].endTime ? classExist.endTime : checkClassTimeConflict[0].endTime
                if (smallStartDate < bigStartDate && bigStartDate < smallEndDate) {
                    return resBuilder.conflict(res, "این کلاس با زمان کلاس هایی ک برداشتید همزمان است")
                }
            }
        }
        await Service.CRUD.updateById('Class', { teacherId: req.userId, status: "reserved" }, req.params.classId, [], "")
        const classExistAssigend = await Service.CRUD.findById('Class', req.params.classId, ['teacherId'])
        resBuilder.success(res, classExistAssigend, "کلاس با موفقیت به شما تخصیص داده شد.")

    },

    unSubmitClass: async (req, res) => {
        try {
            if (!req.params.classId) { return resBuilder.badRequest(res, 'ارسال شناسه کلاس الزامی است') }
            const classExist = await Service.CRUD.findById('Class', req.params.classId, "")
            if (!classExist) { return resBuilder.notFound(res, "کلاسی با این شناسه یافت نشد") }
            if (classExist.teacherId != req.userId) { return resBuilder.conflict(res, "", 'شما نمیتوانید کلاسی که به استاد دیگر تخصیص داده شده است را تغییر وضعیت دهید') }
            await Service.CRUD.updateById('Class', { teacherId: null, status: "open" }, req.params.classId, [], "")
            const classExistAssigend = await Service.CRUD.findById('Class', req.body.classId, ['teacherId'])
            resBuilder.success(res, classExistAssigend, "کلاس با موفقیت از تخصیص استاد برداشته شد.")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    },

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
            req.body.password = req.body.password ? Service.CRYPTOGRAPHY.md5(req.body.password) : undefined
            req.body.role = 'teacher'
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
    },

    changePassword: async (req, res) => {
        if (!req.body.oldPass) { return resBuilder.badRequest(res, "لطفا پسورد قدیمی خود را وارد نمایید") }
        if (!req.body.newPass) { return resBuilder.badRequest(res, "لطفا پسورد جدید خود را وارد نمایید") }
        try {
            const userExist = await Service.CRUD.findById('User', req.userId, [])
            if (!userExist) { return resBuilder.notFound(res, ' یافت نشد') }
            // const data = await Joi.attempt(result.value, Schema.playListValidation.editSchema)
            // req.body.password = req.body.password ? Service.CRYPTOGRAPHY.md5(req.body.password) : undefined
            if (Service.CRYPTOGRAPHY.md5(req.body.oldPass) != req.userData.password) {
                return resBuilder.conflict(res, "", 'رمز عبور که وازد کردید با رمز شما تطابق ندارد')
            }
            const updatedClass = await Service.CRUD.updateById("User",
                { password: Service.CRYPTOGRAPHY.md5(req.body.newPass) },
                req.userId,
                [],
                { softDelete: 0 })
            return resBuilder.success(res, updatedClass, ".موفقیت ویرایش شد")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    }


}