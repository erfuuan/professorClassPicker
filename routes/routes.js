const httpStatus = require("http-status");
const { SendResponse } = require("../utils/SendResponse");

const MainRouter = require("express").Router();

MainRouter.get("/", (req, res) => {
    return SendResponse(res, httpStatus.OK, true, "Index Page")
})

module.exports = {
    MainRouter
}
