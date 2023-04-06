const express = require('express');
const mongoose = require("mongoose")
const router = require('./routes/routes');
const connectWithRetry = require("./connections/db.connection")
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const app = express();

mongoose.connect("mongodb://localhost:27017/proffesorClassPicker", {
    serverSelectionTimeoutMS: 1000, // Timeout after 5s instead of 30s
    // socketTimeoutMS: 10, //
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}))
app.use(morgan('dev'));
app.use("/api/v1/", router);

// app.use((req, res, next) => {
//     next(createHttpError.NotFound("Route not found 🔍"))
// })
// app.use((error, req, res, next) => {
//     const serverError = createHttpError.InternalServerError()
//     const status = error.status || serverError.status
//     const message = error.message || serverError.message
//     return res.status(status).json({
//         status,
//         message
//     })
// })

app.listen(process.env.PORT, (() =>
    console.log('listening on: >> http://localhost:' + process.env.PORT))
);