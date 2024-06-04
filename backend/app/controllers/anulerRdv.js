const connection = require('../db');

module.exports = (req, res) => {
    const { appointment_id } = req.body;

    if (!appointment_id) {
        return res.status(400).json({ success: false, message: 'Appointment ID is required' });
    }

    const sql = 'DELETE FROM rendez_vous WHERE appointment_id = ?';
    const values = [appointment_id];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error cancelling appointment:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        if (results.affectedRows > 0) {
            return res.status(200).json({ success: true, message: 'Appointment cancelled successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
    });
};
