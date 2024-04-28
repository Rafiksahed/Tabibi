const connection = require('../db');

module.exports = (req, res) => {
    if (!req.session.user || !req.session.user.doctor_id) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    const doctorId = req.session.user.doctor_id;

    const sql = `
        SELECT rv.date_time, p.username AS patient_name
        FROM rendez_vous rv
        JOIN patients p ON rv.patient_id = p.patient_id
        WHERE rv.doctor_id = ? AND rv.status = 'accepted'
        ORDER BY rv.date_time ASC;
    `;
    const values = [doctorId];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
        }
        res.status(200).json({ success: true, appointments: results });
    });
};
