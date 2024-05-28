// acceptAppointmentController.js
const connection = require('../db');

module.exports = (req, res) => {
    if (!req.session.user || !req.session.user.doctor_id) {
        res.status(401).json({ success: false, message: 'Unauthorized access' });
        return;
    }

    const { appointmentId } = req.body;
    const doctorId = req.session.user.doctor_id;

    const sql = `
        UPDATE rendez_vous 
        SET status = 'accepted' 
        WHERE appointment_id = ? AND doctor_id = ?;
    `;
    const values = [appointmentId, doctorId];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error accepting appointment:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        res.status(200).json({ success: true, message: 'Appointment accepted successfully' });
    });
};
