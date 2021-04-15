const express = require('express');
const router = express.Router();
const { UserController } = require('../Controllers');

router.get('/', UserController.allUser);
router.get('/:userId', UserController.getUserInfo);
router.post('/', UserController.createUser);
router.patch('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

module.exports = router;