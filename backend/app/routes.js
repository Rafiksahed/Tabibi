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
const acceptRdv = require('./controllers/acceptRdv');
const declineRdv = require('./controllers/declineRdv');
const patientRdv = require('./controllers/patienRdv');
const userType = require('./controllers/userTypeController');
const updateRdv = require('./controllers/updateRdv');
const services = require('./controllers/services');
const { getAppointments, bookAppointment } = require('./controllers/rdvServices');


router.post('/api/login', loginController);
router.post('/api/logout', logoutController);
router.post('/api/registre', registrationController);
router.post('/api/registreMedecin', doctorRegistrationController);
router.get('/info', info);
router.get('/api/appointments', getDoctorAppointmentsController);
router.get('/api/pendingAppointment', pendingAppointment);
router.get('/api/agenda', agenda);
router.post('/api/decline', declineRdv);
router.post('/api/accept', acceptRdv);

router.get('/api/patientRdv', patientRdv);

router.get('/api/userType', userType);

router.put('/api/updateRdv', updateRdv);

router.get('/api/services' , services);

router.get('/api/rdvServices', getAppointments);
router.post('/api/rdvServices', bookAppointment);


module.exports = router;
