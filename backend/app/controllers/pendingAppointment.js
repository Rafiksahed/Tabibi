const connection = require('../db');

module.exports = (req, res) => {
    if (!req.session.user || !req.session.user.doctor_id) {
        res.status(401).json({ success: false, message: 'Unauthorized access' });
        return;
    }

    const doctorId = req.session.user.doctor_id;

    const sql = `
        SELECT rv.appointment_id, p.username AS patient_name, rv.date_time
        FROM rendez_vous rv
        INNER JOIN patients p ON rv.patient_id = p.patient_id
        WHERE rv.doctor_id = ? AND rv.status = 'attente'
        ORDER BY rv.date_time ASC
    `;
    const values = [doctorId];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching accepted doctor appointments:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        res.status(200).json({ success: true, acceptedAppointments: results });
    });
};
