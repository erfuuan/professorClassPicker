const jwt = require("jsonwebtoken");
require("dotenv").config();

const SignAccessToken = (payload) => {
    const { username } = payload;

    const AccessToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d"
    })

    return AccessToken;
}

module.exports = {
    SignAccessToken
}

