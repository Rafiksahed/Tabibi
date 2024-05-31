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
const updateRdv = require('./controllers/updateRdv');
const services = require('./controllers/services');
const fetchinfo = require('./controllers/fetchProfileinfo');
const { getAppointments, bookAppointment } = require('./controllers/rdvServices');


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


const messagesController = require('./controllers/messagerie');


const patientMessageController = require('./controllers/patientMessage');

const doctorController = require('./controllers/doctorController');

const patientIDController = require('./controllers/patientIdController');

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
router.get('/api/fetchinfo', fetchinfo);

router.get('/api/patientRdv', patientRdv);

router.get('/api/userType', userType);

router.put('/api/updateRdv', updateRdv);

router.get('/api/services' , services);

router.get('/api/rdvServices', getAppointments);
router.post('/api/rdvServices', bookAppointment);



// Routes for messaging
router.get('/api/doctor/patients', messagesController.getPatientsForDoctor);
router.get('/api/conversations', messagesController.getConversations);
router.get('/api/messages', messagesController.getMessages);
router.post('/api/conversations', messagesController.createConversation);
router.post('/api/messages', messagesController.sendMessage);

// Routes for messaging

// Routes for messaging for patients
router.get('/api/patient/doctors', patientMessageController.getDoctorsForPatient);
router.get('/api/patient/conversations', patientMessageController.getConversationsForPatient);
router.get('/api/patient/messages', patientMessageController.getMessagesForPatient);
router.post('/api/patient/messages', patientMessageController.sendMessageForPatient);
router.post('/api/patient/conversations', patientMessageController.createConversationForPatient);


// Route to get doctor user_id
router.get('/api/doctor/user', doctorController.getDoctorUserId);
router.get('/api/patient/user', patientIDController.getPatientUserId);

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
