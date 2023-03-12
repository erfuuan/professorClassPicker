const { validationResult } = require("express-validator");
const httpStatus = require("http-status");
const { SendResponse } = require("../../utils/SendResponse");

const validationErrorsMapper = (req, res, next) => {
    let messages = {}
    const result = validationResult(req)
    // console.log(result.errors);
    if (result?.errors?.length > 0) {
        result?.errors.forEach(err => {
            messages[err.param] = err.msg;
        })
        return SendResponse(res, httpStatus.BAD_REQUEST, false, messages)
    }
    next()
}

module.exports = {
    validationErrorsMapper
}

