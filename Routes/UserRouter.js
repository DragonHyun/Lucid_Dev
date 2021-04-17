const express = require('express');
const router = express.Router();
const { UserController } = require('../Controllers');


router.post('/', UserController.signUp);
router.post('/check/unique', UserController.checkUnique);
router.get('/', UserController.allUser);
router.get('/:userId', UserController.getUserInfo);
router.patch('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

module.exports = router;