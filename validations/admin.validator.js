const Joi = require('joi')

const create = Joi.object().keys({
    code: Joi.string().required(),
    userid: Joi.string().allow(null).default(null),
    pool_id: Joi.number().required()
})

const deleteVoucher = Joi.object().keys({ id: Joi.number().required() })

const update = Joi.object().keys({
    id: Joi.number().required(),
    voucher: Joi.object().keys({
        code: Joi.string().required(),
        userid: Joi.string().allow(null).default(null),
    }),
})

const import_voucher = Joi.object().keys({ pool_id: Joi.number().required() })


const getOne = Joi.object().keys({ id: Joi.number().required() })

module.exports = { create, deleteVoucher, update, getOne, import_voucher }
