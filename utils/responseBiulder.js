module.exports = {
    error: function (response, status, error, message) {
        const res = {
            status: status ? status.toString() : undefined,
            error: error ? error : undefined,
            message: message ? message : undefined

        };
        // res.message = global.trans(res.message);
        return response.status(status).send(res);
    },

    success: function (response, data, message) {
        const res = {
            status: '200',
            data: data ? data : undefined,
            message: message ? message : undefined,
        };
        // res.message = res.message;
        return response.status(200).send({ response: res });
    },

    conflict: function (response, data, message) {
        const res = {
            status: '409',
            data: data ? data : undefined,
            message: message ? message : undefined
        };
        // res.message = global.trans(res.message);
        return response.status(409).send({ response: res });
    },

    invalidReq: function (response, data, message) {
        const res = {
            status: '412',
            data: data ? data : undefined,
            message: message ? message : undefined
        };
        return response.status(412).send({ response: res })
    },

    internal: function (response, message) {
        console.error(error);
        const res = {
            status: '500',
            error: 'internal',
            message: message ? message : undefined
        };
        return response.status(500).send(res);
    },

    notFound: function (response, message) {
        const res = {
            status: '404',
            error: 'not_found',
            message: message ? message : undefined

        };
        // res.message = global.trans(res.message);
        return response.status(404).send({ response: res })
    },

    badRequest: function (response, message, data) {
        const res = {
            status: '400',
            error: 'bad_request',
            message: message ? message : undefined,
            data: data ? data : undefined
        };
        // res.message = global.trans(res.message);
        return response.status(400).send(res);
    },

    queued: function (response) {
        const res = {
            status: 'queued',
        };
        // res.message = global.trans(res.message);
        return response.status(200).send({ response: res });
    },

    unauthorized: function (response, message) {
        const res = {
            status: '401',
            error: 'unauthorized',
            message: message ? message : undefined
        };
        // res.message = global.trans(res.message);
        return response.status(401).send(res);
    },

    forbidden: function (response, message) {
        const res = {
            status: '403',
            error: 'forbidden',
            message: message ? message : undefined

        };
        // res.message = global.trans(res.message);
        return response.status(403).send(res);
    },

    notAcceptable(response, message) {
        const res = {
            status: '406',
            error: 'not_acceptable',
            message: message ? message : undefined
        };
        // res.message = global.trans(res.message);
        return response.status(406).send(res);
    },
};
