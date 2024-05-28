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
const adminPanelMedecinStatus = require('./controllers/adminPanelController/adminPanelMedecinStatus');
const adminPanelPatient = require('./controllers/adminPanelController/adminPanelControllerPatient');
const deleteUser = require('./controllers/adminPanelController/deleteUser');
const adminPanelAppointement = require('./controllers/adminPanelController/adminPanelAppointement');
const adminAcceptMedecin = require('./controllers/adminPanelController/adminAcceptMedecin');

const acceptRdv = require('./controllers/acceptRdv');
const declineRdv = require('./controllers/declineRdv');
const patientRdv = require('./controllers/patienRdv');
const userType = require('./controllers/userTypeController');


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
router.get('/api/adminPanelMedecinStatus', adminPanelMedecinStatus);
router.get('/api/adminPanelPatient', adminPanelPatient);
router.delete('/api/deleteUser', deleteUser);
router.get('/api/adminPanelAppointement', adminPanelAppointement);
router.put('/api/adminAcceptMedecin', adminAcceptMedecin);



router.post('/api/decline', declineRdv);
router.post('/api/accept', acceptRdv);

router.get('/api/patientRdv', patientRdv);

router.get('/api/userType', userType);


module.exports = router;
