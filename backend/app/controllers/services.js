const connection = require('../db');

module.exports = (req, res) => {
    const sql = `
        SELECT d.doctor_id, u.username, d.speciality, d.ville, d.adresse
        FROM doctors d
        INNER JOIN users u ON d.user_id = u.user_id and d.status = 'accepted'
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching doctors:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        res.status(200).json({ success: true, doctors: results });
    });
};
