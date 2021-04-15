const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const moment = require('moment');
const { logger, stream } = require('./config/winston');
const mongoose = require('mongoose');
const mongoUrl = require('./config/mongodb.json').mongodbUrl;

const routes = require('./Routes');

const { sequelize } = require('./MySQL/Models');

const app = express();

sequelize.sync({ force: false })
    .then(() => {
        console.log('db connect success');
    })
    .catch((err) => {
        //console.error(err);
    });

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.use(morgan('dev', { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    //res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};

    const errObj = {
        req: {
            headers: req.headers,
            query: req.query,
            body: req.body,
            route: req.route
        },
        error: {
            message: err.message,
            stack: err.stack,
            status: err.status
        }
    }

    logger.error(errObj);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
