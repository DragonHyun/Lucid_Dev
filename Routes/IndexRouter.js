const express = require('express');
const router = express.Router();
const { IndexController } = require('../Controllers');

router.get('/', IndexController.success);
router.post('/mail', IndexController.sendEmail);
router.get('/param/:name', IndexController.paramName);
router.get('/querystring', IndexController.querystring);
router.post('/message', IndexController.message);
router.get('/jwt', IndexController.getJwt);


module.exports = router;