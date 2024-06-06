/*const connection = require('../../db');

const adminAcceptMedecin = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    const username = req.session.user.username;
    const email = req.session.user.email;

    if (email === 'admintabibi@gmail.com' && username === 'admin') {
        const { user_id } = req.body;
        const sql = "UPDATE doctors SET status = 'accepted' WHERE user_id = ?";
        const values = [user_id];

        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Doctor not found' });
            }

            res.status(200).json({ success: true, message: 'Doctor accepted successfully' });
        });
    } else {
        return res.status(403).json({ success: false, message: 'Forbidden access' });
    }
};

module.exports = adminAcceptMedecin;
*/
const connection = require('../../db');

const adminAcceptMedecin = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    const { username, email } = req.session.user;

    if (email === 'admintabibi@gmail.com' && username === 'admin') {
        const { user_id } = req.body;
        const updateStatus = "UPDATE doctors SET status = 'accepted' WHERE user_id = ?";

        connection.query(updateStatus, [user_id], (err, results) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Doctor not found' });
            }

            res.status(200).json({ success: true, message: 'Doctor accepted successfully' });
        });
    } else {
        return res.status(403).json({ success: false, message: 'Forbidden access' });
    }
};

module.exports = adminAcceptMedecin;
