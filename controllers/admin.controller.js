const Service = require('../service/index')
const resBuilder = require('../utils/responseBiulder')
var moment = require("jalali-moment");

// const moment = require('moment')


module.exports = {

    class: {
        getOne: async (req, res) => {
            try {
                // const playlistData = await Service.CRUD.findById('PlayList', req.params.id, ['fileIds', 'authorId', 'tagIds', 'categoryIds'])
                const classData = await Service.CRUD.findById('Class', req.params.id, [])
                if (!classData || classData.softDelete) { return resBuilder.notFound(res, "این کلاس حدف شده است") }
                delete classData.softDelete
                delete classData.createdAt
                delete classData.updatedAt
                return resBuilder.success(res, classData, "")
            } catch (error) {
                console.log("error for find a post === > ", error)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },
        getAll: async (req, res) => {
            try {
                const claass = await Service.CRUD.getAll('Class',
                    { softDelete: false },
                    ['teacherId'],
                    { 'createdAt': -1 }, { softDelete: 0, createdAt: 0, updatedAt: 0 })
                if (claass.length == 0) { return resBuilder.success(res, [], '') }
                claass.forEach(element => {
                    element.registerDate = moment(element.registerDate, 'X').format('jYYYY/jMM/jDD HH:mm')
                    element.startTime = moment(element.startTime, 'X').format('HH:mm')
                    element.endTime = moment(element.endTime, 'X').format('HH:mm')
                });
                return resBuilder.success(res, claass, "")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },
        create: async (req, res) => {
            if (!req.body.unit) { return resBuilder.badRequest(res, 'ارسال واحد کلاس الزامی است') }
            if (!req.body.capacity) { return resBuilder.badRequest(res, 'ارسال ظرفیت کلاس الزامی است') }
            if (!req.body.title) { return resBuilder.badRequest(res, 'ارسال موضوع کلاس الزامی است') }
            if (!req.body.startTime) { return resBuilder.badRequest(res, 'ارسال زمان شروع کلاس الزامی است') }
            if (!req.body.endTime) { return resBuilder.badRequest(res, 'ارسال زمان پایان کلاس الزامی است') }
            if (!req.body.day) { return resBuilder.badRequest(res, 'ارسال روز کلاس الزامی است') }
            if (!req.body.gender) { return resBuilder.badRequest(res, 'ارسال جنسیت شاگردان کلاس الزامی است') }
            if (req.body.gender != 'boy' && req.body.gender != 'girl' && req.body.gender != 'all') { return resBuilder.badRequest(res, ' باشد ارسال جنسیت شاگردان کلاس باید یکی از موارد ][bo,girl,all] است') }

            // if (req.body.gender == 'boy'){
            //     console.log("sen")
            // }


            // const result = Schema.playListValidation.createSchema.validate(req.body)
            // if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
            try {
                // const data = await Joi.attempt(result.value, Schema.playListValidation.createSchema)
                // data.authorId = req.userData._id
                // const newClass = await Service.CRUD.create("Class", data)
                req.body.status = "open"
                req.body.startTime = moment(req.body.startTime, "HH:mm").format("X")
                req.body.endTime = moment(req.body.endTime, "HH:mm").format("X")

                // const claassExist = await Service.CRUD.getAll('Class',
                //     { softDelete: false, title: req.body.title }, "")
                // if (claassExist.length) {
                //      return resBuilder.conflict(res, req.body, "کلاسی با این عنوان در سامانه وجود دارد.")                    
                // }


                const newClass = await Service.CRUD.create("Class", req.body)
                return resBuilder.created(res, newClass, " کلاس شما با موفقیت ایجاد شد.")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }

        },
        update: async (req, res) => {
            // const result = Schema.playListValidation.editSchema.validate(req.body)
            // if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
            if (!req.body.capacity) { return resBuilder.badRequest(res, 'ارسال ظرفیت کلاس الزامی است') }
            if (!req.body.unit) { return resBuilder.badRequest(res, 'ارسال واحد کلاس الزامی است') }
            if (!req.body.title) { return resBuilder.badRequest(res, 'ارسال موضوع کلاس الزامی است') }
            if (!req.body.startTime) { return resBuilder.badRequest(res, 'ارسال زمان شروع کلاس الزامی است') }
            if (!req.body.endTime) { return resBuilder.badRequest(res, 'ارسال زمان پایان کلاس الزامی است') }
            if (!req.body.day) { return resBuilder.badRequest(res, 'ارسال روز کلاس الزامی است') }
            if (!req.body.gender) { return resBuilder.badRequest(res, 'ارسال جنسیت شاگردان کلاس الزامی است') }
            if (req.body.gender != 'boy' && req.body.gender != 'girl' && req.body.gender != 'all') {
                return resBuilder.badRequest(res, ' باشد ارسال جنسیت شاگردان کلاس باید یکی از موارد ][bo,girl,all] است')
            }
            req.body.status = "open"
            req.body.startTime ? req.body.startTime = moment(req.body.startTime, "HH:mm").format("X") : undefined
            req.body.endTime ? req.body.endTime = moment(req.body.endTime, "HH:mm").format("X") : undefined
            try {
                const classExist = await Service.CRUD.findById('Class', req.params.id, [])
                if (!classExist) { return resBuilder.notFound(res, 'کلاس یافت نشد') }
                // const data = await Joi.attempt(result.value, Schema.playListValidation.editSchema)
                const data = req.body
                const updatedClass = await Service.CRUD.updateById("Class",
                    data,
                    req.params.id,
                    [],
                    { softDelete: 0 })
                return resBuilder.success(res, updatedClass, ".کلاس  شما با موفقیت ویرایش شد")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

            }

        },
        delete: async (req, res) => {
            try {
                const claassExist = await Service.CRUD.findById('Class', req.params.id, "")
                if (!claassExist) { return resBuilder.notFound(res, "کلاسی با این عنوان در سامانه وجود ندارد.") }
                await Service.CRUD.delete("Class", req.params.id, { softDelete: true })
                return resBuilder.success(res, "", ". کلاس با موفقیت حذف شد")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },

        unSubmitClass: async (req, res) => {
            try {
                if (!req.body.classId) { return resBuilder.badRequest(res, 'ارسال شناسه کلاس الزامی است') }
                const classExist = await Service.CRUD.findById('Class', req.body.classId, "")
                if (!classExist) { return resBuilder.notFound(res, "کلاسی با این شناسه یافت نشد") }
                await Service.CRUD.updateById('Class', { teacherId: null, status: "open" }, req.body.classId, [], "")
                const classExistAssigend = await Service.CRUD.findById('Class', req.body.classId, ['teacherId'])
                resBuilder.success(res, classExistAssigend, "کلاس با موفقیت از تخصیص استاد برداشته شد.")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        }
    },
    user: {
        getOne: async (req, res) => {
            try {
                // const playlistData = await Service.CRUD.findById('PlayList', req.params.id, ['fileIds', 'authorId', 'tagIds', 'categoryIds'])
                const userData = await Service.CRUD.findById('User', req.params.id, [])
                if (!userData || userData.softDelete == true) { return resBuilder.notFound(res, "این استاد حدف شده است") }
                delete userData.softDelete
                return resBuilder.success(res, userData, "")
            } catch (error) {
                console.log("error for find a post === > ", error)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },
        getAll: async (req, res) => {
            try {
                const users = await Service.CRUD.getAll('User',
                    { softDelete: false, role: "teacher" },
                    "",
                    { 'createdAt': -1 }, { softDelete: 0 })
                if (users.length == 0) { return resBuilder.success(res, [], '') }
                return resBuilder.success(res, users, "")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },
        create: async (req, res) => {
            if (!req.body.email) { return resBuilder.badRequest(res, "ارسال ایمیل اجباری میباشد") }
            if (!req.body.mobile) { return resBuilder.badRequest(res, "ارسال شماره موبایل اجباری میباشد") }
            if (!req.body.password) { return resBuilder.badRequest(res, "ارسال پسورد اجباری میباشد") }
            // const result = Schema.playListValidation.createSchema.validate(req.body)
            // if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
            try {
                // const data = await Joi.attempt(result.value, Schema.playListValidation.createSchema)
                // data.authorId = req.userData._id
                // const newUser = await Service.CRUD.create("Class", data)
                req.body.password = Service.CRYPTOGRAPHY.md5(req.body.password),
                    req.body.role = "teacher"
                const newUser = await Service.CRUD.create("User", req.body)

                return resBuilder.created(res, newUser, " استاد شما با موفقیت ایجاد شد.")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }

        },
        update: async (req, res) => {
            // const result = Schema.playListValidation.editSchema.validate(req.body)
            // if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
            try {
                const userExist = await Service.CRUD.findById('User', req.params.id, [])
                if (!userExist) { return resBuilder.notFound(res, 'استاد یافت نشد') }
                // const data = await Joi.attempt(result.value, Schema.playListValidation.editSchema)
                req.body.password = req.body.password ? Service.CRYPTOGRAPHY.md5(req.body.password) : undefined
                const data = req.body
                const updatedClass = await Service.CRUD.updateById("User",
                    data,
                    req.params.id,
                    [],
                    { softDelete: 0 })
                return resBuilder.success(res, updatedClass, ".استاد  شما با موفقیت ویرایش شد")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },
        delete: async (req, res) => {
            try {
                await Service.CRUD.delete("User", req.params.id, { softDelete: true })
                return resBuilder.success(res, "", ". استاد با موفقیت حذف شد")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },
    },
    bind: async (req, res) => { },
    lesson: {
        getOne: async (req, res) => {
            try {
                // const playlistData = await Service.CRUD.findById('PlayList', req.params.id, ['fileIds', 'authorId', 'tagIds', 'categoryIds'])
                const lessonData = await Service.CRUD.findById('Lesson', req.params.id, [])
                if (!lessonData || lessonData.softDelete) { return resBuilder.notFound(res, "این کلاس حدف شده است") }
                delete lessonData.softDelete
                return resBuilder.success(res, lessonData, "")
            } catch (error) {
                console.log("error for find a post === > ", error)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },

        getAll: async (req, res) => {
            try {
                const lessons = await Service.CRUD.getAll('Lesson',
                    { softDelete: false }, "",
                    { 'createdAt': -1 }, { softDelete: 0 })
                if (lessons.length == 0) { return resBuilder.success(res, [], '') }
                const lessonCom = lessons.map(lesson => { return { ...lesson, show: `${lesson.title}(${lesson.description})` } })
                return resBuilder.success(res, lessonCom, "")

            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },

        create: async (req, res) => {
            if (!req.body.unit) { return resBuilder.badRequest(res, 'ارسال واحد درس الزامی است') }
            // const result = Schema.playListValidation.createSchema.validate(req.body)
            // if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
            try {
                // const data = await Joi.attempt(result.value, Schema.playListValidation.createSchema)
                // data.authorId = req.userData._id
                // const newClass = await Service.CRUD.create("Class", data)

                //     const lessonExist = await Service.CRUD.getAll('Lesson',
                //     { softDelete: false, title: req.body.title }, "")

                // if (claassExist.length) {
                //      return resBuilder.conflict(res, req.body, "کلاسی با این عنوان در سامانه وجود دارد.")                    
                // }

                const newLesson = await Service.CRUD.create("Lesson", req.body)
                return resBuilder.created(res, newLesson, " درس شما با موفقیت ایجاد شد.")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },

        update: async (req, res) => {
            // const result = Schema.playListValidation.editSchema.validate(req.body)
            // if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
            try {
                const lessonExist = await Service.CRUD.findById('Lesson', req.params.id, [])
                if (!lessonExist) { return resBuilder.notFound(res, 'کلاس یافت نشد') }
                // const data = await Joi.attempt(result.value, Schema.playListValidation.editSchema)
                const data = req.body
                const updatedLesson = await Service.CRUD.updateById("Lesson",
                    data,
                    req.params.id,
                    [],
                    { softDelete: 0 })
                return resBuilder.success(res, updatedLesson, ".درس  شما با موفقیت ویرایش شد")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },

        delete: async (req, res) => {
            try {
                // await Service.CRUD.delete("Lesson", req.params.id, { softDelete: true })
                await Service.CRUD.purgeDelete('Lesson',req.params.id)

                return resBuilder.success(res, "", ". درس با موفقیت حذف شد")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },
    }
}