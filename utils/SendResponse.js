const SendResponse = (res, status, success, msg) => {
    const json = {
        status,
        success,
        response: msg
    }
    return res.status(status).json(json);
}

module.exports = {
    SendResponse
}

