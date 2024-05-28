const connection = require('../../db');

const adminAcceptMedecin = (req, res) => {
    const { user_id } = req.body;
    const sql = "UPDATE doctors SET status = 'accepted' WHERE user_id = ?";
    const values = [user_id];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
    });


};

module.exports = adminAcceptMedecin;
