const connection = require('../db');

module.exports = (req, res) => {
    if (!req.session.user || !req.session.user.patient_id) {
        res.status(401).json({ success: false, message: 'Unauthorized access' });
        return;
    }

    const patientId = req.session.user.patient_id;

    const sql = `
        SELECT rv.appointment_id, d.username AS doctor_name, rv.date_time, rv.status
        FROM rendez_vous rv
        INNER JOIN doctors d ON rv.doctor_id = d.doctor_id
        WHERE rv.patient_id = ?
        ORDER BY rv.date_time ASC
    `;
    const values = [patientId];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching patient appointments:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        res.status(200).json({ success: true, patientAppointments: results });
    });
};
