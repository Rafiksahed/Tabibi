const connection = require('../db');

module.exports = (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Not logged in');
    }

    const { appointmentId, newDateTime, status } = req.body;
    const sql = "UPDATE rendez_vous SET date_time = ?, status = ? WHERE appointment_id = ? AND patient_id = ?";
    const values = [newDateTime, status, appointmentId, req.session.user.patient_id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('Internal server error');
            return;
        }
        if (result.affectedRows > 0) {
            res.send('Appointment date and status updated successfully');
        } else {
            res.status(404).send('Appointment not found or permission denied');
        }
    });
};
