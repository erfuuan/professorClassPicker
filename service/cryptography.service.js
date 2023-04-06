const jwt = require("jsonwebtoken");
const md5 = require("md5");
module.exports = {
  generateAccessToken: (username) => {
    return jwt.sign(username, "35rtgrtg3rt3g", { expiresIn: "100d" });
  },

  verifyJwtToken: (token) => {
    // return jwt.verify(token:string, "35rtgrtg3rt3g")
    jwt.verify(token, "35rtgrtg3rt3g", (err, data) => {
      console.log(new Date());
      if (!err) {
        return data.username.toString();
      }
      // } else {
      //     return { status: "success", username: data.username }
      // }
    });
  },
  password: {
    hash: async (password) => await md5(password),
  },
  base64: {
    encode: (data) => {
      let buff = Buffer.from(data);
      return buff.toString("base64");
    },
    decode: (data) => {
      let buff = Buffer.from(data, "base64");
      return buff.toString("utf8");
    },
  },
  md5: (data) => {
    return md5(data);
  },
};
