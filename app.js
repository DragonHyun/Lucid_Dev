const createError = require('http-errors');
const errorHandler = require('./middlewares/error-handler');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { logger, stream } = require('./config/winston');
const mongoose = require('mongoose');
const mongoUrl = require('./config/mongodb.json').mongodbUrl;
const passport = require('passport');
const passportConfig = require('./util/passport');

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
app.use(passport.initialize());
passportConfig();
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(errorHandler);
// error handler
/*app.use(function (err, req, res, next) {
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

    res.status(500).json(err);
    // render the error page
    //res.status(err.status || 500);
    //res.render('error');
});
*/
module.exports = app;
