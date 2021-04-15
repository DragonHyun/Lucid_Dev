// Route 설정
const express = require('express');
const router = express.Router();

const IndexRouter = require('./IndexRouter');
const UserRouter = require('./UserRouter');

// '/'로 시작하는 url
router.use('/', IndexRouter);
// '/user'로 시작하는 url
router.use('/user', UserRouter);

module.exports = router;
