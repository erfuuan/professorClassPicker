const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
// const { UserModel } = require("../../models/User.models");
require("dotenv").config();

async function GetTokenFromHeader (headers) {
    const token = await headers?.authorization?.split(" ")[1] || [];
    if (token) return token;
    throw createHttpError.Unauthorized("You have to login first to access this page!");
    
}

async function VerifyAccessToken (req, res, next) {
    try {
        const token = await GetTokenFromHeader(req.headers).then(token => token);
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            try {
                if (err) throw createHttpError.Unauthorized("You have to login first to access this page!");
                const { username } = payload;
                const user = await UserModel.findOne({ $or: [ { username }, { email: username }]})
                if (!user) throw createHttpError.Unauthorized("Your email and password does not match. Please try again.")
                req.user = user;
                return next();
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    VerifyAccessToken
}
