const express = require('express');
const router = express.Router();
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');
const registrationController = require('./controllers/registrationController');
const doctorRegistrationController = require('./controllers/doctorRegistrationController');
const info = require('./controllers/info');
const getDoctorAppointmentsController = require('./controllers/appointmentController');
const pendingAppointment = require('./controllers/pendingAppointment');
const agenda = require('./controllers/agendaController');
const adminPanel = require('./controllers/adminPanelController/adminPanelController');
const adminPanelMedecin = require('./controllers/adminPanelController/adminPanelControllerMedecin');
const adminPanelPatient = require('./controllers/adminPanelController/adminPanelControllerPatient');
const deleteUser = require('./controllers/adminPanelController/deleteUser');


router.post('/api/login', loginController);
router.post('/api/logout', logoutController);
router.post('/api/registre', registrationController);
router.post('/api/registreMedecin', doctorRegistrationController);
router.get('/info', info);
router.get('/api/appointments', getDoctorAppointmentsController);
router.get('/api/pendingAppointment', pendingAppointment);
router.get('/api/agenda', agenda);
router.get('/api/adminPanel', adminPanel);
router.get('/api/adminPanelMedecin', adminPanelMedecin);
router.get('/api/adminPanelPatient', adminPanelPatient);
router.delete('/api/deleteUser', deleteUser);


module.exports = router;
