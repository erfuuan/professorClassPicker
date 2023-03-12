const express = require('express');
const { MainRouter } = require('./routes/routes');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}))
app.use(morgan('dev'));
app.use(MainRouter);
app.use((req, res, next) => {
    next(createHttpError.NotFound("Route not found 🔍"))
})
app.use((error, req, res, next) => {
    const serverError = createHttpError.InternalServerError()
    const status = error.status || serverError.status
    const message = error.message || serverError.message
    return res.status(status).json({
        status,
        message
    })
})

app.listen(process.env.PORT, () => console.log('listening on: >> http://localhost:' + process.env.PORT));