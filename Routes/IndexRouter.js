const express = require('express');
const router = express.Router();
const { IndexController } = require('../Controllers');
const authChecker = require('../middlewares/jhwtAuthChecker').checkToken;

router.get('/', IndexController.success);
router.post('/mail', IndexController.sendEmail);
router.get('/param/:name', IndexController.paramName);
router.get('/querystring', IndexController.querystring);
router.post('/message', IndexController.message);
router.get('/jwt', IndexController.getJwt);
router.post('/jwt', authChecker, IndexController.verifyJwt);


module.exports = router;