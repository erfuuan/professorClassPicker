const resBiulder = require("../utils/responseBiulder")
const jwt = require("jsonwebtoken")
module.exports = {
    authentication: function (req, res, next) {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader
        if (token == null) return res.sendStatus(401) // if there isn't any token
        // console.log('token', res.locals.TOKEN_SECRET)
        jwt.verify(token, "35rtgrtg3rt3g", (err, userId) => {
            if (err) console.log(err)
            console.log(new Date())
            if (err) {
                return resBiulder.forbidden(res, "نشست شما در سامانه منقضی شده است، لطفا مجددا به سامانه ورود نمایید.")
            }
            // return res.status(403).send('نشست شما در سامانه منقضی شده است، لطفا مجددا به سامانه ورود نمایید.')
            req.userId = userId.username
            // console.log('req.userId', req.userId)
            next() // pass the execution off to whatever request the client intended
        })
    },

}