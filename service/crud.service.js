const Model = require('../models/index')
const moment = require("jalali-moment")

module.exports = {
    create: async (schema, data) => {
        try {
            const newData = new Model[schema](data)
            return await newData.save();
        } catch (err) {
            console.log('err from @create crudService zone')
            console.log(err)
            throw err
        }
    },
    findById: async (schema, dataId, populate) => {
        try {
            const dataSchema = Model[schema]
            // const data = await dataSchema.findById(dataId)
            const data = await dataSchema.findOne({ _id: dataId })

                .populate(populate)
                .lean();
            // data.createdAt = moment(data.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
            // data.updatedAt = moment(data.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
            if (data) {
                return data
            } else { return undefined }
        } catch (err) {
            console.log(err)
            console.log('err from @getOne crudService zone')
            // throw err
            return undefined
        }
    },
    findOneRecord: async (schema, condotion, populate) => {
        try {
            const dataSchema = Model[schema]
            const data = await dataSchema.findOne(condotion)
                .populate(populate)
                .lean();
            // data.createdAt = moment(data.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
            // data.updatedAt = moment(data.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
            return data
        } catch (err) {
            console.log(err)
            console.log('err from @getOne crudService zone')
            throw err
        }
    },
    getAll: async (schema, condition, populate, sort, select) => {
        try {
            const dataSchema = Model[schema]
            const posts = await dataSchema.find(condition)
                .populate(populate)
                .sort(sort)
                .select(select)
                .lean();
            return posts
        } catch (err) {
            console.log(err)
            console.log('err from @getAll crudService zone')
            throw err
        }
    },
    find: async (schema, condition, populate, sort, select) => {
        try {
            const dataSchema = Model[schema]
            const data = await dataSchema.find(condition)
                .populate(populate)
                .sort(sort)
                .select(select)
                .lean();
            // data.createdAt = moment(data.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
            // data.updatedAt = moment(data.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
            return data
        } catch (err) {
            console.log(err)
            console.log('err from @find  crudService zone')
            throw err
        }
    },
    updateById: async (schema, data, dataId, populate, select) => {
        try {
            const dataSchema = Model[schema]
            const updatedData = await dataSchema.findByIdAndUpdate(dataId, data, { new: true })
                .populate(populate)
                .select(select)
                .lean();
            // updatedData.updatedAt = moment(updatedData.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
            // updatedData.createdAt = moment(updatedData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
            return updatedData
        } catch (err) {
            console.log(err)
            console.log('err from @update crudService zone')
            throw err
        }
    },
    delete: async (schema, dataId, data) => {
        try {
            const dataSchema = Model[schema]
            console.log(data)
            await dataSchema.findByIdAndUpdate(dataId, data, { new: true })
            // await dataSchema.findByIdAndUpdate(dataId, data )


            // const deletedData=await dataSchema.findByIdAndRemove(dataId)
            // const deletedData = await dataSchema.deleteOne({ _id: dataId })
            return true
        } catch (err) {
            console.log(err)
            console.log('err from @delete crudService zone')
            throw err
        }
    },
    purgeDelete: async (schema, dataId, data) => {
        try {
            const dataSchema = Model[schema]
            console.log(data)
            await dataSchema.delete
            // const deletedData=await dataSchema.findByIdAndRemove(dataId)
            // const deletedData = await dataSchema.deleteOne({ _id: dataId })
            return true
        } catch (err) {
            console.log(err)
            console.log('err from @delete crudService zone')
            throw err
        }
    },
}