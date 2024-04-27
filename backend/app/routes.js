// routes.js
const express = require('express');
const router = express.Router();
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');
const registrationController = require('./controllers/registrationController');
const doctorRegistrationController = require('./controllers/doctorRegistrationController');
const info = require('./controllers/info');

router.post('/api/login', loginController);
router.post('/api/logout', logoutController);
router.post('/api/registre', registrationController);
router.post('/api/registreMedecin', doctorRegistrationController);
router.get('/info', info);

module.exports = router;
