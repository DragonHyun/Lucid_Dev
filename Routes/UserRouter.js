const express = require('express');
const router = express.Router();
const { UserController } = require('../Controllers');
const passport = require('passport');

router.post('/check/unique', UserController.checkUnique);
router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

router.patch('/', passport.authenticate('jwt', { session: false }), UserController.modifyUser);

router.get('/', UserController.allUser);

module.exports = router;