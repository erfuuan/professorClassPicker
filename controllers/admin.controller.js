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
                    "",
                    { 'createdAt': -1 }, { softDelete: 0, createdAt: 0, updatedAt: 0 })
                if (claass.length == 0) { return resBuilder.success(res, [], '') }
                claass.forEach(element => {
                    element.registerDate = moment(element.registerDate, 'X').format('jYYYY/jMM/jDD HH:mm')
                    element.startTime = moment(element.startTime, 'X').format('jYYYY/jMM/jDD HH:mm')
                    element.endTime = moment(element.endTime, 'X').format('jYYYY/jMM/jDD HH:mm')
                });
                return resBuilder.success(res, claass, "")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },
        create: async (req, res) => {
            // const result = Schema.playListValidation.createSchema.validate(req.body)
            // if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
            try {
                // const data = await Joi.attempt(result.value, Schema.playListValidation.createSchema)
                // data.authorId = req.userData._id
                // const newClass = await Service.CRUD.create("Class", data)
                req.body.status = "open"
                req.body.startTime = moment(req.body.startTime, "jYYYY/jMM/jDD HH:mm").format("X")
                req.body.endTime = moment(req.body.endTime, "jYYYY/jMM/jDD HH:mm").format("X")

                const claassExist = await Service.CRUD.getAll('Class',
                    { softDelete: false, title: req.body.title }, "")

                if (claassExist.length) {
                     return resBuilder.conflict(res, req.body, "کلاسی با این عنوان در سامانه وجود دارد.")                    
                }


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
                const claassExist = await Service.CRUD.getAll('Class',
                    { softDelete: false, title: req.body.title }, "")
                if (!claassExist.length) { return resBuilder.notFound(res, "کلاسی با این عنوان در سامانه وجود ندارد.") }

                await Service.CRUD.delete("Class", req.params.id, { softDelete: true })
                return resBuilder.success(res, "", ". کلاس با موفقیت حذف شد")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },
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
            // const result = Schema.playListValidation.createSchema.validate(req.body)
            // if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
            try {
                // const data = await Joi.attempt(result.value, Schema.playListValidation.createSchema)
                // data.authorId = req.userData._id
                // const newUser = await Service.CRUD.create("Class", data)
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
                await Service.CRUD.delete("Lesson", req.params.id, { softDelete: true })
                return resBuilder.success(res, "", ". درس با موفقیت حذف شد")
            } catch (err) {
                console.log(err)
                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },
    }
}